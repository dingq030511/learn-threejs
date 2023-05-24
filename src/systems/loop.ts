import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

type Updatable = {
  tick?: (delta: number) => void;
  update?: (delta?: number) => void;
};

type TaskCallback = (delta?: number) => void
export class Loop {
  private clock: Clock;
  private tasks: Array<TaskCallback> = [];
  constructor(
    private camera: PerspectiveCamera,
    private scene: Scene,
    private renderer: WebGLRenderer,
    public updatables: Array<Updatable> = []
  ) {
    this.clock = new Clock();
  }

  register(task: TaskCallback){
    this.tasks.push(task);
  }

  unregister(task: TaskCallback){
    const index = this.tasks.findIndex(t=>t===task);
    this.tasks.splice(index, 1);
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }

  update() {
    const delta = this.clock.getDelta();
    for (const obj of this.updatables) {
      if(obj.update){
        obj.update(delta);
      } else if(obj.tick){
        obj.tick(delta);
      }
    }
    for(const task of this.tasks){
      task(delta);
    }
  }
}
