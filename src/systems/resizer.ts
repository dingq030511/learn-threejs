import { Camera, PerspectiveCamera, WebGLRenderer } from 'three';

export class Resizer {
  constructor(private container: Element,private camera: Camera,private renderer: WebGLRenderer){
    this.setSize();
    window.addEventListener('resize', ()=>{
      this.setSize();
    });
  }

  setSize(){
    if(this.camera instanceof PerspectiveCamera){
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
    }
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}