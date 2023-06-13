import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'three';

export function createCube(cubeSize = 4) {
  const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
  const material = createMaterial();
  const cube = new Mesh(geometry, material);
  cube.position.x = 0;
  cube.position.y = 0;
  cube.castShadow = true;
  return cube;
}

export function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('/assets/textures/general/plaster.jpg');
  const material = new MeshStandardMaterial({
    map: texture,
    metalness: 0.2,
    roughness: 0.07,
  });
  return material;
}
