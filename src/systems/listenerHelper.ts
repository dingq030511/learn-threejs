import { Camera, Intersection, Object3D, Raycaster, Scene, Vector3, Event as ThreeEvent } from 'three';

type MeshListener = (mesh: Object3D, intersection: Intersection<Object3D<ThreeEvent>>) => void;

const eventList =  ['click', 'dblclick'] as const

export class ListenerHelper {
  listenerMap: WeakMap<Object3D, Map<string, Array<MeshListener>>>;
  constructor(private container: HTMLElement, private camera: Camera, private scene: Scene) {
    this.listenerMap = new WeakMap();
    this.init();
  }

  init() {
    eventList.forEach(eventType => {
      this.container.addEventListener(eventType, this.mouseEventHandler, false);
    });
  }

  dispose() {
    eventList.forEach(eventType => {
      this.container.removeEventListener(eventType, this.mouseEventHandler, false);
    });
  }

  listen(mesh: Object3D, eventType: typeof eventList[number], listener: MeshListener) {
    if (!this.listenerMap.has(mesh)) {
      this.listenerMap.set(mesh, new Map());
    }
    const meshListenerMap = this.listenerMap.get(mesh)!;
    if (!meshListenerMap.has(eventType)) {
      meshListenerMap.set(eventType, []);
    }
    const listenerArray = meshListenerMap.get(eventType)!;
    listenerArray.push(listener);
  }

  private getLinstenObject(mesh: Object3D) {
    while (!this.listenerMap.has(mesh) && mesh.parent) {
      mesh = mesh.parent;
    }
    return mesh;
  }

  mouseEventHandler = (event: MouseEvent) => {
    const vector = new Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(this.camera);
    const raycaster = new Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
    const intersects = raycaster.intersectObjects(this.scene.children);
    if (intersects.length > 0) {
      const mesh = this.getLinstenObject(intersects[0].object);
      const meshListenerMap = this.listenerMap.get(mesh);
      if (!meshListenerMap) {
        return;
      }
      const listeners = meshListenerMap.get(event.type);
      if (listeners) {
        listeners.forEach(listener => listener.call(mesh, mesh, intersects[0]));
      }
    }
  };
}
