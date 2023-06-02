import { AnimationMixer, BufferGeometry, MeshStandardMaterial, SkinnedMesh } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export async function loadSalsa(){
  const loader = new FBXLoader()
  const salsa = await loader.loadAsync('/assets/models/salsa/salsa.fbx');
  salsa.scale.set(0.2, 0.2, 0.2);
  salsa.translateY(-13);
  salsa.children.forEach(child=>{
    if(child instanceof SkinnedMesh){
      const material = child.material as MeshStandardMaterial;
      material.emissive = material.color;
      material.emissiveMap = material.map;
    }
  });
  const mixer = new AnimationMixer(salsa);
  let animationClip = salsa.animations[0];
  const clipAction = mixer.clipAction(animationClip).play();
  animationClip = clipAction.getClip();
  return {salsa, mixer};
}