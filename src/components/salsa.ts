import { AnimationMixer, BufferGeometry, Mesh, MeshPhongMaterial, MeshStandardMaterial, SkinnedMesh } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export async function loadSalsa(){
  const loader = new FBXLoader()
  const model = await loader.loadAsync('/assets/models/fbx/fbxfile.fbx');
  // salsa.scale.set(0.2, 0.2, 0.2);
  // salsa.translateY(-13);
  // model.children.forEach(child=>{
  //   if(child instanceof SkinnedMesh){
  //     const material = child.material as MeshStandardMaterial;
  //     material.emissive = material.color;
  //     material.emissiveMap = material.map;
  //   }
  // });
  console.log(model);
  const goodsShelf = model.children[0].children[0];
  if(goodsShelf instanceof Mesh){
    const material = goodsShelf.material as MeshPhongMaterial;
    material.emissive = material.color;
    // material.emissiveMap = material.map;
    // console.log(goodsShelf);
  }
  goodsShelf.scale.set(0.02, 0.02, 0.02);
  
  // const mixer = new AnimationMixer(model);
  // let animationClip = model.animations[0];
  // const clipAction = mixer.clipAction(animationClip).play();
  // animationClip = clipAction.getClip();
  return {model: model};
}