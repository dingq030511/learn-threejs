import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { createSphere } from './sphere';

export function createDisplacementSphere() {
  const sphere = createSphere();
  const loader = new TextureLoader();
  const displacementMap = loader.load('/assets/textures/w_d.png');
  sphere.material.displacementMap = displacementMap;
  sphere.position.x = 5;
  sphere.position.y = (-1 / 3) * Math.PI;
  return sphere;
}
