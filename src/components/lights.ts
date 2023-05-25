import { AmbientLight, DirectionalLight, HemisphereLight, SpotLight, Vector2 } from 'three';

export function createLights() {
  const ambientLight = new AmbientLight('white', 0.5);
  const mainLight = new DirectionalLight('white', 2);
  const hemisphereLight = new HemisphereLight(
    0x0000ff, // bright sky color
    0x00ff00, // dim ground color
    0.6
  );
  mainLight.position.set(10, 10, 10);
  const spotLight = new SpotLight(0xffffff, 1);
  spotLight.position.set(-40, 40, -15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;
  return { ambientLight, mainLight, hemisphereLight, spotLight };
}
