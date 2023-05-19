import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { createCamera } from '../components/camera';
import { createScene } from '../components/scene';
import { createRenderer } from '../systems/renderer';
import { createCube } from '../components/cube';
import { Resizer } from '../systems/resizer';
import { createLights } from '../components/lights';
import { Loop } from '../systems/loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createControls } from '../systems/controls';

export class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;
  constructor(container: string | Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    if(typeof container === "string"){
      container = document.querySelector(container)!;
    }
    container.append(this.renderer.domElement);
    this.controls = createControls(this.camera, this.renderer.domElement);
    const cube = createCube();
    // this.loop.updatables.push(cube);
    this.loop.updatables.push(this.controls);
    const light = createLights();
    this.scene.add(cube, light);
    const resizer = new Resizer(container, this.camera, this.renderer);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start(){
    this.loop.start();
  }

  stop(){
    this.loop.stop();
  }
}
