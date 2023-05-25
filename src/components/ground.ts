import { Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, TextureLoader } from 'three';

export function createGround() {
  const groundGeometry = new PlaneGeometry(1000, 1000);
  const textureLoader = new TextureLoader();
  // const texture = textureLoader.load('/assets/textures/ground/grasslight-big.jpg');
  // texture.wrapS = RepeatWrapping;
  // texture.wrapT = RepeatWrapping;
  // texture.repeat.set(10, 10);
  const groundMaterial = new MeshStandardMaterial({
    wireframe: true,
  });
  const ground = new Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -0.5 * Math.PI;
  ground.position.set(15, 0, 0);
  ground.receiveShadow = true;
  return ground;
}
