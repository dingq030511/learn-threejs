import 'three';
import 'three/examples/jsm/controls/OrbitControls.js';
declare module 'three' {
  interface Mesh {
    tick: (delta: number)=>void
  }
}

declare module 'three/examples/jsm/controls/OrbitControls.js' {
  interface OrbitControls {
    tick: (delta: number)=>void
  }
}