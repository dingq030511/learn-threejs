import { CameraHelper, Fog, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
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
import GUI from 'lil-gui';
import { createSphere } from '../components/sphere';

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
    const { spotLight, hemisphereLight } = createLights();
    const ground = createGround();
    const cube = createCube();
    const params = {
      rotationSpeed: 0.01,
      addCube: () => {
        this.addCube();
      },
    };
    this.loop.register(() => {
      cube.rotation.x += params.rotationSpeed;
      cube.rotation.y += params.rotationSpeed;
      cube.rotation.z += params.rotationSpeed;
    });
    const gui = new GUI();
    gui.add(params, 'rotationSpeed', 0, 0.5).step(0.01);
    gui.add(params, 'addCube');
    this.scene.add(spotLight, hemisphereLight, ground, cube);
    // this.scene.fog = new Fog(0xffffff, 0.015, 100);
    this.camera.lookAt(this.scene.position);
    // const debugCamera = new CameraHelper(spotLight.shadow.camera);
    // this.scene.add(debugCamera);
    const sphere = createSphere();
    this.scene.add(sphere);
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

  addCube() {
    const cubeSize = Math.ceil(Math.random() * 3);
    const cube = createCube(cubeSize);
    cube.name = 'cube-' + this.scene.children.length;
    cube.position.x = -30 + Math.round(Math.random() * 60);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * 20);
    this.scene.add(cube);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
