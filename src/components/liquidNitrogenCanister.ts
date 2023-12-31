import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

export async function loadLiquidNitrogenCanister() {
  const loader = new ColladaLoader();
  const model = await loader.loadAsync(process.env.PUBLIC_PATH + 'assets/models/dae/gas-tank.dae');
  console.log(model);
  return model;
}
