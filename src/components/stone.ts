import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'three';
import { createCube } from './cube';

export function createStone() {
  const stone = createCube();
  const loader = new TextureLoader();
  const bumpMap = loader.load('/assets/textures/stone/stone-bump.jpg');
  stone.material.bumpMap = bumpMap;
  stone.position.x = 3;
  stone.position.y = (-1 / 3) * Math.PI;
  return stone;
}
