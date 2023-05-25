import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'three';

export function createCube(cubeSize = 4) {
  const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
  const material = createMaterial();
  const cube = new Mesh(geometry, material);
  cube.position.set(-4, 3, 0);
  cube.castShadow = true;
  return cube;
}

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('/assets/textures/wall.jpg');
  const material = new MeshStandardMaterial({
    map: texture,
  });
  return material;
}
