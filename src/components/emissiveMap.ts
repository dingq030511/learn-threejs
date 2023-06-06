import { Color, Mesh, MeshPhongMaterial, RepeatWrapping, SphereGeometry, TextureLoader, Vector2 } from 'three';
import { createSphere } from './sphere';

export function createEmissiveMapSphere() {
  const sphere = createSphere();
  sphere.material.map = null;
  sphere.material.color = new Color(0x333333);
  const loader = new TextureLoader();
  const emissiveMap = loader.load('/assets/textures/emissive/lava.png');
  sphere.material.emissiveMap = emissiveMap;
  sphere.material.emissive = new Color(0xffffff);
  const normalMap = loader.load('/assets/textures/emissive/lava-normals.png');
  sphere.material.normalMap = normalMap;
  const metalnessMap = loader.load('/assets/textures/emissive/lava-smoothness.png');
  sphere.material.metalnessMap = metalnessMap;
  sphere.material.metalness = 1;
  sphere.material.roughness = 0.4;
  sphere.material.normalScale = new Vector2(4, 4);
  sphere.position.x = 5;
  sphere.position.y = (-1 / 3) * Math.PI;
  return sphere;
}
