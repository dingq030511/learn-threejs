import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'three';
import { createCube } from './cube';

export function createStone() {
  const stone = createCube();
  const loader = new TextureLoader();
  const normalMap = loader.load(process.env.PUBLIC_PATH + 'assets/textures/general/plaster-normal.jpg');
  stone.material.normalMap = normalMap;
  stone.material.normalScale.set(1, 1);
  stone.position.x = 3;
  stone.position.y = (-1 / 3) * Math.PI;
  return stone;
}
