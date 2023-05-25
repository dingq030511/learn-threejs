import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';

export function createSphere() {
  const sphereGeo = new SphereGeometry(4, 25, 25);
  const sphereMaterial = new MeshPhongMaterial({
    color: 0x7777ff,
  });
  const sphere = new Mesh(sphereGeo, sphereMaterial);
  sphere.position.set(10, 5, 10);
  sphere.castShadow = true;
  return sphere;
}
