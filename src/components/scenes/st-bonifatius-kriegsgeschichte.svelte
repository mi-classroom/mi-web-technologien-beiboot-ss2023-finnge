<script lang="ts">
  /**
   * This is the AR scene for the St. Bonifatius church in Kriegsgeschichte.
   * It is a simple scene with a knot object. The knot object is placed on the ground.
   * A line is drawn between the knot objects.
   */

  import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Mesh,
    DodecahedronGeometry,
    MeshPhongMaterial,
    Line,
    LineBasicMaterial,
    BufferGeometry,
  } from "three";
  import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

  import { light, reticle, cameraFactory, rendererFactory } from "./common";
  import type { ObjectColorMap } from "./common";

  export let renderer: WebGLRenderer;

  export let canvasElement: HTMLCanvasElement;
  let camera: PerspectiveCamera;

  const scene = new Scene();
  scene.add(light);
  scene.add(reticle);

  // Knot Object
  const objectKnotColor: ObjectColorMap = {
    normal: 0x6929c4,
    active: 0x005d5d,
  };
  const objectKnot = new Mesh(
    new DodecahedronGeometry(0.01, 0).translate(0, 0.01, 0),
    new MeshPhongMaterial({ color: objectKnotColor.normal }),
  );
  objectKnot.visible = false;
  scene.add(objectKnot);

  const knots: Mesh[] = [];

  // Line Object
  const objectLine = new Line(
    new BufferGeometry(),
    new LineBasicMaterial({ color: 0xff7eb6, linewidth: 10 }),
  );

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
  }

  function onSelect() {
    if (reticle.visible) {
      reticle.visible = false;

      // Add knot
      knots.push(objectKnot.clone());

      const newKnot = knots[knots.length - 1];
      scene.add(newKnot);
      newKnot.material = new MeshPhongMaterial({
        color: objectKnotColor.active,
      });
      newKnot.visible = true;

      reticle.matrix.decompose(
        newKnot.position,
        newKnot.quaternion,
        newKnot.scale,
      );

      // Last knot
      if (knots.length < 2) {
        return;
      }
      const lastKnot = knots[knots.length - 2];
      lastKnot.material = new MeshPhongMaterial({
        color: objectKnotColor.normal,
      });

      // Add line
      const newLine = objectLine.clone();
      scene.add(newLine);
      newLine.visible = true;
      newLine.geometry = new BufferGeometry().setFromPoints([
        lastKnot.position,
        newKnot.position,
      ]);
    }
  }
</script>

<canvas bind:this={canvasElement}></canvas>

<style>
  canvas {
    display: block;
  }
</style>
