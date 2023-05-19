import { Clock, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export class Loop {
  private clock: Clock;
  constructor(
    private camera: PerspectiveCamera,
    private scene: Scene,
    private renderer: WebGLRenderer,
    public updatables: Array<Mesh<any, any>> = []
  ) {
    this.clock = new Clock();
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = this.clock.getDelta();
    for(const obj of this.updatables){
      obj.tick(delta);
    }
  }
}
