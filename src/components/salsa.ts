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
  model.scale.set(0.02, 0.02, 0.02)
  model.position.set(0,0,0);
  model.rotateX(Math.PI)
  // const mixer = new AnimationMixer(model);
  // let animationClip = model.animations[0];
  // const clipAction = mixer.clipAction(animationClip).play();
  // animationClip = clipAction.getClip();
  return {model: model};
}