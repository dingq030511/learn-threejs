import { Mesh } from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

export async function loadTruck() {
  const loader = new ColladaLoader();
  const model = await loader.loadAsync('/assets/models/medieval/Medieval_building.DAE');
  const scene = model.scene;
  scene.children.forEach(child => {
    if (child instanceof Mesh) {
      child.receiveShadow = true;
      child.castShadow = true;
    } else {
      scene.remove(child);
    }
  });
  scene.rotation.z = 0.5 * Math.PI;
  scene.scale.set(8, 8, 8);
  return scene;
}
