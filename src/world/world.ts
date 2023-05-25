import {
  AdditiveBlending,
  CameraHelper,
  Color,
  Fog,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';
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
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

export class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;
  private stats: Stats;
  private container: Element;
  constructor(container: string | Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.stats = createStats();
    if (typeof container === 'string') {
      this.container = document.querySelector(container)!;
    } else {
      this.container = container;
    }
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.container.append(this.stats.dom);
    this.container.append(this.renderer.domElement);
    this.init();
  }

  async init() {
    const axes = createAxesHelper();
    this.scene.add(axes);
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
    // const { parrot, flamingo, stork } = await loadBirds();
    // this.controls.target.copy(parrot.position);
    // this.loop.updatables.push(parrot, flamingo, stork);
    // this.scene.add(parrot, flamingo, stork);
    const textureLoader = new TextureLoader();
    const textureFlare = textureLoader.load('/assets/textures/flares/lensflare0.png');
    const textureFlare3 = textureLoader.load('/assets/textures/flares/lensflare3.png');
    const flareColor = new Color(0xffaacc);
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare, 350, 0, flareColor))
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6, flareColor))
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7, flareColor))
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9, flareColor))
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1.0, flareColor))
    lensflare.position.copy(spotLight.position);
    this.scene.add(lensflare);
    const resizer = new Resizer(this.container, this.camera, this.renderer);
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
