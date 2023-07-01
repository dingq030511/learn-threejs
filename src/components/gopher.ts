import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export async function loadGopher(){
  const loader = new OBJLoader();
  const mesh = await loader.loadAsync(process.env.PUBLIC_PATH + 'assets/models/gopher/gopher.obj');
  return mesh;
}