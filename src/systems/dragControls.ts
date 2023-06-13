import { Camera, Object3D } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

export function createDragControls(objects: Object3D[],camera: Camera, canvas: HTMLCanvasElement){
  const controls = new DragControls(objects,camera, canvas);
  controls.transformGroup = true;
  return controls;
}