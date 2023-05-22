import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

type Updatable = {
  tick: (delta: number) => void;
};
export class Loop {
  private clock: Clock;
  constructor(
    private camera: PerspectiveCamera,
    private scene: Scene,
    private renderer: WebGLRenderer,
    public updatables: Array<Updatable> = []
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
    for (const obj of this.updatables) {
      obj.tick?.(delta);
    }
  }
}
