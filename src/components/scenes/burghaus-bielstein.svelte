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
    AudioListener,
    PositionalAudio,
    Group,
  } from "three";
  import type { Object3DEventMap } from "three";
  import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
  import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";
  import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

  export let renderer: WebGLRenderer;
  export let canvasElement: HTMLCanvasElement;
  let audioElementAmbience: HTMLAudioElement;
  let audioElementIndustry: HTMLAudioElement;
  let audioElementDishwasher: HTMLAudioElement;

  const scene = new Scene();
  const loader = new OBJLoader();

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

  // Load Objects
  let progress = 0;
  const numOfLoaders = 2;
  const loaderOnProgress: Parameters<OBJLoader["load"]>[2] = (xhr) => {
    const loaded = xhr.loaded / xhr.total;
    progress += loaded / numOfLoaders;
  };
  const loaderOnError: Parameters<OBJLoader["load"]>[3] = (error) => {
    console.error(error);
  };

  let objectDishwasher: Group<Object3DEventMap>;
  loader.load(
    `${base}/media/models/11636_Diswasher_v1_L3.obj`,
    (object) => {
      objectDishwasher = object;
      objectDishwasher.visible = false;
      scene.add(objectDishwasher);
    },
    loaderOnProgress,
    loaderOnError,
  );

  let objectIndustry: Group<Object3DEventMap>;
  loader.load(
    `${base}/media/models/OBJ_Robot.obj`,
    (object) => {
      objectIndustry = object;
      objectIndustry.visible = false;
      scene.add(objectIndustry);
    },
    loaderOnProgress,
    loaderOnError,
  );

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
    soundDishwasher.setMediaElementSource(audioElementDishwasher);
    soundIndustry.setMediaElementSource(audioElementIndustry);

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
      reticle.visible = false;
      if (firstTimePlaying) {
        firstTimePlaying = false;
        soundDishwasher.play();
      }
      objectDishwasher.visible = true;
      objectDishwasher.add(soundDishwasher);
      reticle.matrix.decompose(
        objectDishwasher.position,
        objectDishwasher.quaternion,
        objectDishwasher.scale,
      );
    }
  }
</script>

<audio
  autoplay
  loop
  volume="0.5"
  bind:this={audioElementAmbience}
  src={`${base}/media/audio/birds-singing-calm-river-nature-ambient-sound-127411.mp3`}
/>
<audio
  bind:this={audioElementIndustry}
  src={`${base}/media/audio/industrial-sounds-25817.mp3`}
/>
<audio
  bind:this={audioElementDishwasher}
  src={`${base}/media/audio/dishwasher-running-160643.mp3`}
/>

{#if progress < 1}
  <div class="centered">
    <progress value={progress} max="1" />
  </div>
{/if}

<canvas bind:this={canvasElement}></canvas>


<style>
  canvas {
    display: block;
  }
</style>
