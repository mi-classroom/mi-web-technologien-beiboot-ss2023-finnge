<script lang="ts">
  /**
   * This is the AR scene for the Straße der Arbeit in Steinbreche-Weiershagen.
   * It is a simple scene with a video object. The video object is placed on the ground.
   * The video is played when the video object is selected.
   */

  import { base } from "$app/paths";

  import {
    Scene,
    WebGLRenderer,
    Mesh,
    PlaneGeometry,
    MeshPhongMaterial,
    VideoTexture,
    DoubleSide,
    Vector2,
    Raycaster,
  } from "three";
  import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

  import { light, reticle, cameraFactory, rendererFactory } from "./common";

  export let renderer: WebGLRenderer;
  export let canvasElement: HTMLCanvasElement;
  let videoElement: HTMLVideoElement;
  let hasPlacedScene = false;

  const scene = new Scene();
  scene.add(light);
  scene.add(reticle);

  // Cube
  const videoObjectWidth = 0.25;
  const videoObject = new Mesh(
    new PlaneGeometry(videoObjectWidth, (videoObjectWidth * 9) / 16).translate(
      0,
      videoObjectWidth / 2,
      0,
    ),
    new MeshPhongMaterial({ color: 0xdd1166 }),
  );
  videoObject.visible = false;
  scene.add(videoObject);

  let firstTimePlaying = true;

  export const init = () => {
    // Camera
    const camera = cameraFactory(window.innerWidth / window.innerHeight);

    // Rendering
    renderer = rendererFactory(
      canvasElement,
      window.devicePixelRatio,
      window.innerWidth,
      window.innerHeight,
    );

    canvasElement.after(
      ARButton.createButton(renderer, {
        requiredFeatures: ["hit-test"],
        optionalFeatures: ["dom-overlay"],
        domOverlay: { root: document.body },
      }),
    );

    // Select
    const controller = renderer.xr.getController(0);
    controller.addEventListener("select", onSelect);
    scene.add(controller);

    // Video
    const texture = new VideoTexture(videoElement);
    videoObject.material.map = texture;
    videoObject.material.side = DoubleSide;

    // Interaction
    const mouseVector = new Vector2();
    const raycaster = new Raycaster();

    document.addEventListener("click", (e) => {
      mouseVector.x = 2 * (e.clientX / renderer.domElement.clientWidth) - 1;
      mouseVector.y = 1 - 2 * (e.clientY / renderer.domElement.clientHeight);
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      for (let i = 0; i < intersects.length; i++) {
        const intersection = intersects[i];

        switch (intersection.object.uuid) {
          case videoObject.uuid:
            if (videoElement.paused) {
              videoElement.play();
            } else {
              videoElement.pause();
            }
            break;
        }
      }
    });

    // Animation
    let hitTestSource: XRHitTestSource | undefined = undefined;
    let hitTestSourceRequested = false;

    renderer.setAnimationLoop(async (timestamp, frame) => {
      let referenceSpace = renderer.xr.getReferenceSpace();
      const session = renderer.xr.getSession();

      if (!session) {
        return;
      }

      if (session.requestHitTestSource && hitTestSourceRequested === false) {
        referenceSpace = await session.requestReferenceSpace("viewer"); // possible double
        hitTestSource = await session.requestHitTestSource({
          space: referenceSpace,
        });

        session.addEventListener("end", function () {
          hitTestSourceRequested = false;
          hitTestSource = undefined;

          // Refresh the page
          location.reload();
        });

        hitTestSourceRequested = true;
      }

      if (hitTestSource && referenceSpace && !hasPlacedScene) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          const hit = hitTestResults[0];

          reticle.visible = true;

          let xrPose = hit.getPose(referenceSpace);
          if (xrPose) {
            reticle.matrix.fromArray(xrPose.transform.matrix);
          }
        } else {
          reticle.visible = false;
        }
      }

      renderer.render(scene, camera);
    });

    return () => {
      renderer.clear();
      renderer.dispose();
    };
  };

  function onSelect() {
    if (hasPlacedScene) {
      return;
    }

    if (reticle.visible) {
      hasPlacedScene = true;
      videoObject.visible = true;

      if (firstTimePlaying) {
        firstTimePlaying = false;
        videoElement.play();
      }
      reticle.matrix.decompose(
        videoObject.position,
        videoObject.quaternion,
        videoObject.scale,
      );
    }
  }
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
  bind:this={videoElement}
  loop
  playsinline
  preload="auto"
  style="display: none"
  src="{base}/media/video/tischler.mp4"
/>

<canvas bind:this={canvasElement}></canvas>

<style>
  canvas {
    display: block;
  }
</style>
