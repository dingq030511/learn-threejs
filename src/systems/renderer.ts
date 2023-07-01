import { WebGLRenderer } from 'three';

export function createRenderer(){
  const renderer = new WebGLRenderer({
    // 抗锯齿
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.localClippingEnabled = true;
  return renderer;
}