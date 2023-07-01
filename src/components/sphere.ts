import { Mesh, MeshPhongMaterial, MeshStandardMaterial, SphereGeometry, TextureLoader } from 'three';

export function createSphere() {
  const sphereGeo = new SphereGeometry(4, 25, 25);
  const sphereMaterial = createSphereMaterial();
  const sphere = new Mesh(sphereGeo, sphereMaterial);
  sphere.position.set(-2, 5, 10);
  sphere.castShadow = true;
  return sphere;
}


export function createSphereMaterial(){
  const loader = new TextureLoader();
  const texture = loader.load(process.env.PUBLIC_PATH + 'assets/textures/w_c.jpg');
  return new MeshStandardMaterial({
    map: texture,
  });
}