import 'three';
declare module 'three' {
  interface Mesh {
    tick: (delta: number)=>void
  }
}