import { Color, Mesh, MeshPhongMaterial, RepeatWrapping, SphereGeometry, TextureLoader } from 'three';
import { createSphere } from './sphere';

export function createAlphaMapSphere() {
  const sphere = createSphere();
  const loader = new TextureLoader();
  const alphaMap = loader.load(process.env.PUBLIC_PATH + 'assets/textures/alpha/partial-transparency.png');
  sphere.material.alphaMap = alphaMap;
  // sphere.material.envMap = al
  sphere.material.metalness = 0.02;
  sphere.material.roughness = 0.07;
  sphere.material.color = new Color(0xffffff);
  sphere.material.alphaTest = 0.5;
  sphere.material.alphaMap.wrapS = RepeatWrapping;
  sphere.material.alphaMap.wrapT = RepeatWrapping;
  sphere.material.alphaMap.repeat.set(8, 8)
  sphere.position.x = 5;
  sphere.position.y = (-1 / 3) * Math.PI;
  return sphere;
}
