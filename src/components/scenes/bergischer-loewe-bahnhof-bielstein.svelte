<script lang="ts">
  /**
   * This is the AR scene for the Bergischer Löwe in Bielstein.
   * It is a simple scene with a cylinder and a sound.
   * The sound is played when the cylinder is selected.
   * The cylinder is placed on the ground.
   * The sound is played from the cylinder.
   */

  import { onMount } from "svelte";
  import { base } from "$app/paths";

  import {
    Scene,
    PerspectiveCamera,
    HemisphereLight,
    WebGLRenderer,
    Mesh,
    RingGeometry,
    MeshBasicMaterial,
    CylinderGeometry,
    MeshPhongMaterial,
    AudioListener,
    PositionalAudio,
  } from "three";
  import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
  import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";

  export let renderer: WebGLRenderer;
  export let canvasElement: HTMLCanvasElement;
  let audioElement: HTMLAudioElement;

  const scene = new Scene();

  // Lighting
  const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  // Reticle
  const reticle = new Mesh(
    new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
    new MeshBasicMaterial(),
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  // Cube
  const cube = new CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0);
  const material = new MeshPhongMaterial({ color: 0xdd1166 });
  const mesh = new Mesh(cube, material);
  mesh.visible = false;
  scene.add(mesh);

  // Audio
  const listener = new AudioListener();
  const sound = new PositionalAudio(listener);
  sound.setRefDistance(1);
  sound.setDirectionalCone(180, 230, 0.1);

  const helper = new PositionalAudioHelper(sound, 1);
  sound.add(helper);

  let firstTimePlaying = true;

  onMount(() => {
    // Camera
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // Rendering
    const gl = canvasElement.getContext("webgl", {
      xrCompatible: true,
    });
    if (!gl) {
      throw new Error("WebGL not supported");
    }
    renderer = new WebGLRenderer({
      canvas: canvasElement,
      context: gl,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

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

    // Audio
    camera.add(listener);
    sound.setMediaElementSource(audioElement);

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

      if (hitTestSource && referenceSpace) {
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
  });

  function onSelect() {
    if (reticle.visible) {
      if (firstTimePlaying) {
        firstTimePlaying = false;
        audioElement.play();
      }
      mesh.visible = true;
      mesh.add(sound);
      reticle.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
    }
  }
</script>

<audio bind:this={audioElement} loop preload="auto" style="display: none">
  <source src="{base}/media/audio.mp3" type="audio/mpeg" />
</audio>

<canvas bind:this={canvasElement}></canvas>

<style>
  canvas {
    display: block;
  }
</style>
