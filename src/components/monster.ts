import GUI from 'lil-gui';
import { AnimationMixer, SkinnedMesh } from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { addClipActionFolder } from '../common/utils';

export async function loadMonster() {
  const loader = new ColladaLoader();
  const monster = await loader.loadAsync(process.env.PUBLIC_PATH + 'assets/models/monster/monster.dae');
  monster.scene.rotateZ(-0.2 * Math.PI);
  monster.scene.translateX(-20);
  monster.scene.translateY(-20);
  monster.scene.children.forEach(child=>{
    if(child instanceof SkinnedMesh){
      child.material.emissive =  child.material.color;
      child.material.emissiveMap = child.material.map;
    }
  })
  const mixer = new AnimationMixer(monster.scene);
  const _animationClip = monster.scene.animations[0];
  const clipAction = mixer.clipAction(_animationClip).play();
  const animationClip = clipAction.getClip();
  const mixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction() {
      mixer.stopAllAction();
    },
  };
  const gui = new GUI();
  const mixerFolder = gui.addFolder('AnimationMixer');
  mixerFolder.add(mixerControls, 'time').listen();
  mixerFolder.add(mixerControls, 'timeScale', 0, 5).onChange((timeScale: number) => (mixer.timeScale = timeScale));
  mixerFolder.add(mixerControls, 'stopAllAction').listen();
  const controls = addClipActionFolder('ClipAction 1', gui, clipAction, animationClip);
  return { monster, mixer, animationClip, clipAction, controls };
}
