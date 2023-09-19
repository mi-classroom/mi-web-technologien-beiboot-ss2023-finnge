<script lang="ts">
  /**
   * This is the AR scene for the Bergischer Löwe in Bielstein.
   * It places a base object with two cylinders on the ground.
   * The cylinders play sounds when selected.
   */

  import { base } from "$app/paths";

  import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Mesh,
    DodecahedronGeometry,
    AudioListener,
    PositionalAudio,
    MeshPhongMaterial,
    CylinderGeometry,
    Vector2,
    Raycaster,
  } from "three";
  import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
  import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";

  import { light, reticle, cameraFactory, rendererFactory } from "./common";
  import type { ObjectColorMap } from "./common";

  export let renderer: WebGLRenderer;

  export let canvasElement: HTMLCanvasElement;
  let audioElementAmbience: HTMLAudioElement;
  let audioElementIndustry: HTMLAudioElement;
  let audioElementDishwasher: HTMLAudioElement;
  let camera: PerspectiveCamera;
  let hasPlacedScene = false;

  const scene = new Scene();
  scene.add(light);
  scene.add(reticle);

  // Objects
  const objectBase = new Mesh(
    new DodecahedronGeometry(0.1, 0).translate(0, 0.1, 0),
    new MeshPhongMaterial({ color: 0xff7eb6 }),
  );
  objectBase.visible = false;
  scene.add(objectBase);

  const objectDishwasherColor: ObjectColorMap = {
    normal: 0x6929c4,
    active: 0x31135e,
  };
  const objectDishwasher = new Mesh(
    new CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0),
    new MeshPhongMaterial({ color: objectDishwasherColor.normal }),
  );
  objectDishwasher.visible = false;
  objectDishwasher.position.x = 3;
  objectBase.add(objectDishwasher);

  const objectIndustryColor: ObjectColorMap = {
    normal: 0x005d5d,
    active: 0x022b30,
  };
  const objectIndustry = new Mesh(
    new CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0),
    new MeshPhongMaterial({ color: objectIndustryColor.normal }),
  );
  objectIndustry.visible = false;
  objectIndustry.position.x = -3;
  objectBase.add(objectIndustry);

  // Audio
  const listener = new AudioListener();
  const soundDishwasher = new PositionalAudio(listener);
  soundDishwasher.setRefDistance(1);
  soundDishwasher.setDirectionalCone(180, 230, 0.1);
  soundDishwasher.add(new PositionalAudioHelper(soundDishwasher, 1));

  const soundIndustry = new PositionalAudio(listener);
  soundIndustry.setRefDistance(1);
  soundIndustry.setDirectionalCone(180, 230, 0.1);
  soundIndustry.add(new PositionalAudioHelper(soundIndustry, 1));

  let firstTimePlaying = true;

  export function init() {
    // Camera
    camera = cameraFactory(window.innerWidth / window.innerHeight);

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

    // Audio
    camera.add(listener);
    soundDishwasher.setMediaElementSource(audioElementDishwasher);
    soundIndustry.setMediaElementSource(audioElementIndustry);

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
          case objectDishwasher.uuid:
            if (audioElementDishwasher.paused) {
              audioElementDishwasher.play();
              objectDishwasher.material.color.set(objectDishwasherColor.active);
            } else {
              audioElementDishwasher.pause();
              objectDishwasher.material.color.set(objectDishwasherColor.normal);
            }
            break;
          case objectIndustry.uuid:
            if (audioElementIndustry.paused) {
              audioElementIndustry.play();
              objectIndustry.material.color.set(objectIndustryColor.active);
            } else {
              audioElementIndustry.pause();
              objectIndustry.material.color.set(objectIndustryColor.normal);
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
  }

  function onSelect() {
    if (hasPlacedScene) {
      return;
    }

    if (reticle.visible) {
      hasPlacedScene = true;
      reticle.visible = false;
      if (firstTimePlaying) {
        firstTimePlaying = false;
        soundDishwasher.play();
      }

      objectBase.visible = true;
      objectDishwasher.visible = true;
      objectDishwasher.add(soundDishwasher);
      objectIndustry.visible = true;
      objectIndustry.add(soundIndustry);

      // place base object on the ground facing the camera
      reticle.matrix.decompose(
        objectBase.position,
        objectBase.quaternion,
        objectBase.scale,
      );
    }
  }
</script>

<audio
  loop
  volume="0.5"
  bind:this={audioElementAmbience}
  src={`${base}/media/sounds/birds-singing-calm-river-nature-ambient-sound-127411.mp3`}
/>
<audio
  loop
  bind:this={audioElementIndustry}
  src={`${base}/media/sounds/industrial-sounds-25817.mp3`}
/>
<audio
  loop
  volume="0.6"
  bind:this={audioElementDishwasher}
  src={`${base}/media/sounds/dishwasher-running-160643.mp3`}
/>

<canvas bind:this={canvasElement}></canvas>

<style>
  canvas {
    display: block;
  }
</style>
