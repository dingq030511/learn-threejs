import { Mesh, MeshLambertMaterial, SphereGeometry, TextureLoader } from 'three';

export async function loadPlanet(){
  const loader = new TextureLoader();
  const [planetTexture, normalTexture] = await Promise.all([
    loader.loadAsync(process.env.PUBLIC_PATH + 'assets/textures/mars/mars_1k_color.jpg'),
    loader.loadAsync(process.env.PUBLIC_PATH + 'assets/textures/mars/mars_1k_normal.jpg'),
  ]);
  const planetMaterial = new MeshLambertMaterial({
    map: planetTexture,
    normalMap: normalTexture
  });
  const planetGeometry = new SphereGeometry(20, 40, 40);
  const planet = new Mesh(planetGeometry, planetMaterial);
  return planet;
}