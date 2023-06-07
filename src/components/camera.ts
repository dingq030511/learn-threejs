import { PerspectiveCamera } from 'three';

export function createCamera() {
  const camera = new PerspectiveCamera(
    45, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(-50, 40, 30);
  return camera;
}