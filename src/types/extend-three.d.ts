import 'three';
import 'three/examples/jsm/controls/OrbitControls.js';

type Tickable = {
  tick(delta: number): void;
};
declare module 'three' {
  interface Mesh extends Tickable {}

  interface Group extends Tickable {}

  interface Object3D extends Tickable {}
}

declare module 'three/examples/jsm/controls/OrbitControls.js' {
  interface OrbitControls {
    tick: (delta: number) => void;
  }
}
