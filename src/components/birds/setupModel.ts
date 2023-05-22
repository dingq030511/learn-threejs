import { AnimationMixer } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mod } from 'three/examples/jsm/nodes/Nodes.js';

export function setupModel(data: GLTF) {
  const model = data.scene.children[0];
  const clip = data.animations[0];
  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();
  model.tick = delta => mixer.update(delta);
  return model;
}
