import { OrthographicCamera } from 'three';

export function createOrthoCamera() {
  const camera = new OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -10, 10);
  return camera;
}
