import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { createCamera } from '../components/camera';
import { createScene } from '../components/scene';
import { createRenderer } from '../systems/renderer';
import { Resizer } from '../systems/resizer';
import { createLights } from '../components/lights';
import { Loop } from '../systems/loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createControls } from '../systems/controls';
import { loadBirds } from '../components/birds/birds';
import type Stats from 'three/examples/jsm/libs/stats.module.js';
import { createStats } from '../systems/stats';
import { createAxesHelper } from '../systems/axes-helper';
import { createGround } from '../components/ground';
import { createCube } from '../components/cube';

export class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;
  private stats: Stats;
  constructor(container: string | Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    const axes = createAxesHelper();
    this.scene.add(axes);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    if (typeof container === 'string') {
      container = document.querySelector(container)!;
    }
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.stats = createStats();
    // const train = new Train();
    // this.loop.updatables.push(cube);
    this.loop.updatables.push(this.controls, this.stats);
    const { spotLight } = createLights();
    const ground = createGround();
    const cube = createCube();
    this.scene.add(spotLight, ground, cube);
    this.camera.lookAt(this.scene.position);
    const resizer = new Resizer(container, this.camera, this.renderer);
    container.append(this.stats.dom);
    container.append(this.renderer.domElement);
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();
    this.controls.target.copy(parrot.position);
    this.loop.updatables.push(parrot, flamingo, stork);
    this.scene.add(parrot, flamingo, stork);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
