import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { createCamera } from '../components/camera';
import { createScene } from '../components/scene';
import { createRenderer } from '../systems/renderer';
import { createCube } from '../components/cube';
import { Resizer } from '../systems/resizer';
import { createLights } from '../components/lights';

export class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  constructor(container: string | Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    if(typeof container === "string"){
      container = document.querySelector(container)!;
    }
    container.append(this.renderer.domElement);
    const cube = createCube();
    const light = createLights();
    this.scene.add(cube, light);
    const resizer = new Resizer(container, this.camera, this.renderer);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
