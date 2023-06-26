import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

export async function loadLiquidNitrogenCanister() {
  const loader = new ColladaLoader();
  const model = await loader.loadAsync('/assets/models/dae/gas-tank.dae');
  return model;
}
