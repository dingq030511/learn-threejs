import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

export function createGround() {
  const groundGeometry = new PlaneGeometry(60, 20);
  const groundMaterial = new MeshBasicMaterial({
    color: 0xaaaaaa,
  });
  const ground = new Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -0.5 * Math.PI;
  ground.position.set(15, 0, 0);
  return ground;
}
