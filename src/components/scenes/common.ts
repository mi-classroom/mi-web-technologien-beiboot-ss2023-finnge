import {
  PerspectiveCamera,
  HemisphereLight,
  WebGLRenderer,
  Mesh,
  RingGeometry,
  MeshBasicMaterial,
} from "three";
import type { ColorRepresentation } from "three";

// Color mapping for states of objects
export type ObjectColorMap = {
  normal: ColorRepresentation;
  active: ColorRepresentation;
};

// Scene lighting
const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
light.position.set(0.5, 1, 0.25);

// Reticle
const reticle = new Mesh(
  new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
  new MeshBasicMaterial(),
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;

// Camera
const cameraFactory = (aspectRatio: number) => {
  const camera = new PerspectiveCamera(70, aspectRatio, 0.1, 1000);
  return camera;
};

// Renderer
const rendererFactory = (
  canvas: HTMLCanvasElement,
  pixelRatio: typeof window.devicePixelRatio,
  innerWidth: typeof window.innerWidth,
  innerHeight: typeof window.innerHeight,
) => {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  renderer.xr.enabled = true;
  return renderer;
};

export { light, cameraFactory, rendererFactory, reticle };
