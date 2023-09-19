<script lang="ts">
  /**
   * This is the AR scene for the St. Bonifatius church in Kriegsgeschichte.
   * It is a simple scene with a knot object. The knot object is placed on the ground.
   * A line is drawn between the knot objects.
   */

  import {
    Scene,
    PerspectiveCamera,
    HemisphereLight,
    WebGLRenderer,
    Mesh,
    DodecahedronGeometry,
    RingGeometry,
    MeshBasicMaterial,
    MeshPhongMaterial,
    Line,
    LineBasicMaterial,
    BufferGeometry,
  } from "three";
  import type { ColorRepresentation } from "three";
  import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

  export let renderer: WebGLRenderer;

  export let canvasElement: HTMLCanvasElement;
  let camera: PerspectiveCamera;

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

  // Knot Object
  type ObjectColorMap = {
    normal: ColorRepresentation;
    active: ColorRepresentation;
  };

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
    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // Rendering
    renderer = new WebGLRenderer({
      canvas: canvasElement,
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
