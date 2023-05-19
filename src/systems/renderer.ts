import { WebGLRenderer } from 'three';

export function createRenderer(){
  const renderer = new WebGLRenderer({
    // 抗锯齿
    antialias: true, 
  });
  
  return renderer;
}