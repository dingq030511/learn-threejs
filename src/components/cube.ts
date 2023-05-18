import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

export function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({
    color: 'purple',
  });
  const cube = new Mesh(geometry, material);
  cube.rotation.set(-0.5, -0.1, 0.8);
  const cube2 = cube.clone();
  cube2.position.set(1,1,1)
  cube.add(cube2);
  return cube;
}
