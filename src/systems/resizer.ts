import { PerspectiveCamera, WebGLRenderer } from 'three';

export class Resizer {
  constructor(private container: Element,private camera: PerspectiveCamera,private renderer: WebGLRenderer){
    this.setSize();
    window.addEventListener('resize', ()=>{
      this.setSize();
    });
  }

  setSize(){
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}