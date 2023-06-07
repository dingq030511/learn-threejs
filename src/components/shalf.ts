import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


  const loader = new FBXLoader();
  loader.setPath('/assets/models/fbx/');
export async function loadShalf(src: string){
  const model = await loader.loadAsync(src);
  return model;
}