import { AmbientLight, DirectionalLight } from 'three';

export function createLights() {
  const ambientLight = new AmbientLight('white', 0.5);
  const mainLight = new DirectionalLight('white', 2);
  mainLight.position.set(10, 10, 10);
  return {ambientLight,mainLight};
}
