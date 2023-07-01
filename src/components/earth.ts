import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader, Vector2 } from 'three';

export async function createEarth(){
  const sphereGeo = new SphereGeometry(4, 25, 25);
  const textureLoader = new TextureLoader();
  const [texture,normalEarth, earthSpec] = await Promise.all([
    textureLoader.loadAsync(process.env.PUBLIC_PATH + 'assets/textures/earth/Earth.png'),
    textureLoader.loadAsync(process.env.PUBLIC_PATH + 'assets/textures/earth/EarthNormal.png'),
    textureLoader.loadAsync(process.env.PUBLIC_PATH + 'assets/textures/earth/EarthSpec.png'),
  ]);
  const sphereMaterial = new MeshPhongMaterial({
    map: texture,
    normalMap: normalEarth,
    specularMap: earthSpec,
    normalScale: new Vector2(6, 6)
  });
  const sphere = new Mesh(sphereGeo, sphereMaterial);
  sphere.position.set(-2, 5, 10);
  return sphere;
}