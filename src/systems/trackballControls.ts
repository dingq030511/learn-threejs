import { Camera } from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'

export function createTrackballControls(camera: Camera, dom: HTMLCanvasElement){
  const controls = new TrackballControls(camera, dom);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = ['65', '83', '68'];
  return controls;
}