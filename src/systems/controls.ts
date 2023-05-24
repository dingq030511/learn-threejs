import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement){
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  return controls;
}