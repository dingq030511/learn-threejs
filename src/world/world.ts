import {
  AdditiveBlending,
  BufferGeometry,
  CameraHelper,
  Color,
  DoubleSide,
  Fog,
  LatheGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  Raycaster,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three';
import { createCamera } from '../components/camera';
import { createScene } from '../components/scene';
import { createRenderer } from '../systems/renderer';
import { Resizer } from '../systems/resizer';
import { createLights } from '../components/lights';
import { Loop } from '../systems/loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createControls } from '../systems/controls';
import { loadBirds } from '../components/birds/birds';
import type Stats from 'three/examples/jsm/libs/stats.module.js';
import { createStats } from '../systems/stats';
import { createAxesHelper } from '../systems/axes-helper';
import { createGround } from '../components/ground';
import { createCube } from '../components/cube';
import GUI from 'lil-gui';
import { createSphere } from '../components/sphere';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import { loadGopher } from '../components/gopher';
import { createPoints } from '../components/points';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { radialWave } from '../components/radialWave';
import { createText } from '../components/text';
import { createSprites } from '../components/sprites';
import { createOrthoCamera } from '../components/orthoCamera';
import { createSprite } from '../components/sprite';
import { loadObjModel } from '../components/objModel';
import { createButterfly } from '../components/butterfly';
import { loadTruck } from '../components/house';
import { loadPdb } from '../components/pdb';
import { loadCarcloud } from '../components/carcloud';

export class World {
  private camera: PerspectiveCamera;
  private orthoCamera: OrthographicCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;
  private stats: Stats;
  private container: Element;
  constructor(container: string | Element) {
    this.camera = createCamera();
    this.orthoCamera = createOrthoCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.stats = createStats();
    if (typeof container === 'string') {
      this.container = document.querySelector(container)!;
    } else {
      this.container = container;
    }
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.container.append(this.stats.dom);
    this.container.append(this.renderer.domElement);
    const resizer = new Resizer(this.container, this.camera, this.renderer);
    this.init();
  }

  listen(){
    const camera = this.camera;
    const scene = this.scene;
    function onDocumentMouseDown(event: MouseEvent){
      const vector = new Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
      vector.unproject(camera);
      const raycaster = new Raycaster(camera.position, vector.sub(camera.position).normalize());
      const intersects = raycaster.intersectObjects(scene.children);
      if(intersects.length > 0){
        const mesh = intersects[0].object as Mesh<BufferGeometry, MeshStandardMaterial>;
        mesh.material.transparent = true;
        mesh.material.opacity = 0.6;
        mesh.material.alphaTest = 0.1;
      }
    }
    document.body.addEventListener('click', onDocumentMouseDown, false);
  }

  async init() {
    const axes = createAxesHelper();
    this.scene.add(axes);
    // const train = new Train();
    // this.loop.updatables.push(cube);
    this.loop.updatables.push(this.controls, this.stats);
    const { spotLight, ambientLight } = createLights();
    const ground = createGround();
    const cube = createCube();
    const params = {
      rotationSpeed: 0.01,
      addCube: () => {
        this.addCube();
      },
    };
    this.loop.register(() => {
      cube.rotation.x += params.rotationSpeed;
      cube.rotation.y += params.rotationSpeed;
      cube.rotation.z += params.rotationSpeed;
    });
    this.scene.add(cube);
    const gui = new GUI();
    gui.add(params, 'rotationSpeed', 0, 0.5).step(0.01);
    gui.add(params, 'addCube');
    // this.scene.add(ground);
    this.scene.add(spotLight, ambientLight);
    // this.scene.fog = new Fog(0xffffff, 0.015, 100);
    this.camera.lookAt(this.scene.position);
    // this.orthoCamera.lookAt(new Vector3(20, 30, 0));
    // const debugCamera = new CameraHelper(spotLight.shadow.camera);
    // this.scene.add(debugCamera);
    const sphere = createSphere();
    // this.scene.add(sphere);
    // const { parrot, flamingo, stork } = await loadBirds();
    // this.controls.target.copy(parrot.position);
    // this.loop.updatables.push(parrot, flamingo, stork);
    // this.scene.add(parrot, flamingo, stork);
    const textureLoader = new TextureLoader();
    const textureFlare = textureLoader.load('/assets/textures/flares/lensflare0.png');
    const textureFlare3 = textureLoader.load('/assets/textures/flares/lensflare3.png');
    const flareColor = new Color(0xffaacc);
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare, 350, 0, flareColor));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6, flareColor));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7, flareColor));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9, flareColor));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1.0, flareColor));
    // lensflare.position.copy(spotLight.position);
    // const gopher = await loadGopher();
    // const material = new MeshLambertMaterial({
    //   color: new Color('rgb(119,119,255)'),
    //   emissive: 0x2a2a2a,
    //   side: DoubleSide,
    // });
    // gopher.children.forEach(e=>{
    //   if(e instanceof Mesh){
    //     e.material = material;
    //   }
    // })
    // this.scene.add(gopher);
    // const points = createPoints();
    // const latheGeometry = new LatheGeometry(points, 100, 0, Math.PI);
    // const latheMesh = new Mesh(latheGeometry, material);
    // this.scene.add(latheMesh);

    // const text = await createText();
    // this.scene.add(text);
    // const parametricGeometry = new ParametricGeometry(radialWave, 120, 120);
    // const parametricMesh = new Mesh(parametricGeometry, material);
    // this.scene.add(parametricMesh);
    // const sprites = createSprites();
    // this.scene.add(sprites);
    // const points = await createPoints('/assets/textures/particles/raindrop-3.png');
    // this.scene.add(points);
    // this.loop.register(()=>{
    //   const positionArray = points.geometry.getAttribute('position');
    //   for(let i =0;i<positionArray.count;i++){
    //     let x = positionArray.getX(i) + 0.06;
    //     let y = positionArray.getY(i) - 0.3;
    //     if(x > 60){
    //       x -= 120;
    //     }
    //     if(y < -40){
    //       y+=80
    //     }
    //     positionArray.setX(i, x);
    //     positionArray.setY(i, y);
    //   }
    //   positionArray.needsUpdate = true;
    // });
    // const result = await Promise.all([
    //   createPoints('/assets/textures/particles/snowflake1_t.png'),
    //   createPoints('/assets/textures/particles/snowflake2_t.png'),
    //   createPoints('/assets/textures/particles/snowflake3_t.png'),
    //   createPoints('/assets/textures/particles/snowflake4_t.png'),
    //   createPoints('/assets/textures/particles/snowflake5_t.png'),
    // ]);
    // result.forEach(snow=>{
    //   this.scene.add(snow);
    //   this.loop.register(() => {
    //     const positionArray = snow.geometry.getAttribute('position');
    //     for (let i = 0; i < positionArray.count; i++) {
    //       let x = positionArray.getX(i) + 0.06;
    //       let y = positionArray.getY(i) - 0.3;
    //       if (x > 60) {
    //         x -= 120;
    //       }
    //       if (y < -40) {
    //         y += 80;
    //       }
    //       positionArray.setX(i, x);
    //       positionArray.setY(i, y);
    //     }
    //     positionArray.needsUpdate = true;
    //   });
    // });
    // const objModel = await loadObjModel();
    // this.scene.add(objModel);
    // const butterfly = await createButterfly();
    // this.scene.add(butterfly);
    // const truck = await loadTruck();
    // this.scene.add(truck);
    // const pdb = await loadPdb();
    // this.scene.add(pdb);
    // const carcloud = await loadCarcloud();
    // this.scene.add(carcloud);
    // this.scene.add(lensflare);
    this.listen();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  addCube() {
    const cubeSize = Math.ceil(Math.random() * 3);
    const cube = createCube(cubeSize);
    cube.name = 'cube-' + this.scene.children.length;
    cube.position.x = -30 + Math.round(Math.random() * 60);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * 20);
    this.scene.add(cube);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
