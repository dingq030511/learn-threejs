import { AnimationMixer, BufferGeometry, MeshStandardMaterial, SkinnedMesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export async function loadCesiumMan(){
  const loader = new GLTFLoader();
  const model = await loader.loadAsync('/assets/models/CesiumMan/CesiumMan.gltf');
  const scene = model.scene;
  scene.scale.set(6,6,6);
  scene.translateY(-3);
  scene.rotateY(-0.3 * Math.PI);
  const mesh = scene.children[0].children[1] as SkinnedMesh<BufferGeometry, MeshStandardMaterial>;
  mesh.material.emissive = mesh.material.color;
  mesh.material.emissiveMap = mesh.material.map;
  const mixer = new AnimationMixer(scene);
  const _animationClip = model.animations[0];
  const clipAction = mixer.clipAction(_animationClip).play();
  const animationClip = clipAction.getClip();
  console.log(model);
  return {
    scene,
    mixer,
    animationClip
  }
}