import {
  AdditiveBlending,
  BufferGeometry,
  CameraHelper,
  Color,
  CubeTextureLoader,
  DoubleSide,
  Fog,
  Group,
  LatheGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Object3D,
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
// import GUI from 'lil-gui';
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
import { loadPlanet } from '../components/planet';
import { loadMonster } from '../components/monster';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { createTrackballControls } from '../systems/trackballControls';
import { loadCesiumMan } from '../components/cesiumMan';
import { loadSalsa } from '../components/salsa';
import { createStone } from '../components/stone';
import { createDisplacementSphere } from '../components/displacementMap';
import { createAlphaMapSphere } from '../components/alphaMap';
import { createEmissiveMapSphere } from '../components/emissiveMap';
import { createEarth } from '../components/earth';
import { createVideoCube } from '../components/videoCube';
import { loadShalf } from '../components/shalf';
import { ListenerHelper } from '../systems/listenerHelper';
import { Modal, message } from 'ant-design-vue';
import ShalfDetail from '../views/components/ShalfDetail.vue'
import { createVNode } from 'vue';

export class World {
  private camera: PerspectiveCamera;
  private orthoCamera: OrthographicCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;
  // private trackballControls: TrackballControls;
  private stats: Stats;
  private container: HTMLElement;
  private listenerHelper: ListenerHelper;
  constructor(container: string | HTMLElement) {
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
    this.listenerHelper = new ListenerHelper(this.container, this.camera, this.scene);
    // this.trackballControls = createTrackballControls(this.camera, this.renderer.domElement);
    this.container.append(this.stats.dom);
    this.container.append(this.renderer.domElement);
    const resizer = new Resizer(this.container, this.camera, this.renderer);
    this.init();
  }

  async init() {
    const axes = createAxesHelper();
    this.scene.add(axes);
    // const train = new Train();
    // this.loop.updatables.push(cube);
    this.loop.updatables.push(this.stats);
    const { spotLight, mainLight, ambientLight } = createLights();
    const ground = createGround();
    const cube = createCube();
    const params = {
      rotationSpeed: 0.01,
      addCube: () => {
        this.addCube();
      },
    };
    this.loop.register(() => {
      this.controls.update();
      // this.trackballControls.update();
    });
    // this.loop.register(() => {
    //   cube.rotation.x += params.rotationSpeed;
    //   cube.rotation.y += params.rotationSpeed;
    //   cube.rotation.z += params.rotationSpeed;
    // });
    // this.scene.add(cube);
    // const gui = new GUI();
    // gui.add(params, 'rotationSpeed', 0, 0.5).step(0.01);
    // gui.add(params, 'addCube');
    // this.scene.add(ground);
    this.scene.add(mainLight, ambientLight);
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

    // const planet = await loadPlanet();
    // this.scene.add(planet);
    // const {monster, mixer, controls, clipAction} = await loadMonster();
    // this.scene.add(monster.scene);
    // this.loop.register((delta)=>{
    //   mixer.update(delta);
    //   controls.time = mixer.time;
    //   controls.effectiveTimeScale = clipAction.getEffectiveTimeScale();
    //   controls.effectiveWeight = clipAction.getEffectiveWeight();
    // });
    // const {scene, mixer} = await loadCesiumMan();
    // this.scene.add(scene)
    // this.loop.register(delta=>{
    //   mixer.update(delta);
    // });
    const { model: shalf3 } = await loadSalsa();
    this.scene.add(shalf3);
    // const cube1 = createCube();
    // const cube2 = createStone();
    // this.scene.add(cube1, cube2);
    // const sphere2 = createDisplacementSphere();
    // const sphere2 = createEmissiveMapSphere();
    // this.scene.add(sphere, sphere2);
    // this.loadBackground();
    // const earth = await createEarth();
    // this.scene.add(earth);
    // const videoCube = await createVideoCube();
    // this.scene.add(videoCube);
    // const shalf1 = await loadShalf('superMarketshalf.fbx');
    // shalf1.position.x = -20
    // shalf1.scale.set(0.2,0.2,0.2)
    // const shalf2 = await loadShalf('3dxy.com.fbx');
    // shalf2.position.set(5, 0, 0);
    // shalf2.scale.set(0.01,0.01,0.01)
    // const shalf3 = await loadShalf('3dxy1.com.fbx');
    // shalf3.position.set(0, 0, 0);
    // shalf3.scale.set(0.01, 0.01, 0.01)
    const shalf4 = shalf3.clone();
    const shalf5 = shalf3.clone();
    shalf4.position.set(0, 0, 5);
    shalf5.position.set(0, 0, 10);
    this.scene.add(shalf3,shalf4, shalf5);
    this.listenerHelper.listen(shalf3, 'click', this.shalfClickHandler)
    this.listenerHelper.listen(shalf4, 'click', this.shalfClickHandler)
    this.listenerHelper.listen(shalf5, 'click', this.shalfClickHandler)
    this.listenerHelper.listen(shalf3, 'dblclick', this.shalfDblclickHandler)
    this.listenerHelper.listen(shalf4, 'dblclick', this.shalfDblclickHandler)
    this.listenerHelper.listen(shalf5, 'dblclick', this.shalfDblclickHandler)
    // this.listenerHelper.listen(cube, 'dblclick', this.cubeDblClickHandler);
  }

  shalfClickHandler(mesh: Object3D){
    // const shalf = mesh.children[1];
    // shalf.children.forEach(child=>{
    //   if(child instanceof Mesh){
    //     if(!child.userData.originMaterial) {
    //       child.userData.originMaterial = child.material;
    //     }
    //     if(child.userData.originMaterial !== child.material){
    //       child.material = child.userData.originMaterial;
    //       return;
    //     }
    //     child.material = child.material.clone();
    //     child.material.color = new Color('lightgreen');
    //   }
    // })
  }

  shalfDblclickHandler(mesh: Object3D){
    // const shalf = mesh.children[1];
    // shalf.children.forEach(child=>{
    //   if(child instanceof Mesh){
    //     if(!child.userData.originMaterial) {
    //       child.userData.originMaterial = child.material;
    //     }
    //     if(child.userData.originMaterial !== child.material){
    //       child.material = child.userData.originMaterial;
    //       return;
    //     }
    //     // child.material = child.material.clone();
    //     // child.material.color = new Color('red');
    //   }
    // })
    // if(!mesh.userData.originPosition){ 
    //   mesh.userData.originPosition = mesh.position.clone();
    // }
    // if(!mesh.position.equals(mesh.userData.originPosition)) {
    //   mesh.position.copy(mesh.userData.originPosition);
    //   mesh.rotateY(Math.PI / 3)
    //   return;
    // }
    Modal.success({
      title: '货架详情',
      icon: null,
      content: createVNode(ShalfDetail, {
        model: mesh
      }),
      width: 800,
    })
  }

  cubeDblClickHandler = (mesh: Object3D)=>{
    Modal.success({
      title: '货架详情',
      icon: null,
      content: createVNode(ShalfDetail, {
        model: mesh
      }),
      width: 800,
    })
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  async loadBackground(){
    const urls = [
      '/assets/textures/cubemap/flowers/right.png',
      '/assets/textures/cubemap/flowers/left.png',
      '/assets/textures/cubemap/flowers/top.png',
      '/assets/textures/cubemap/flowers/bottom.png',
      '/assets/textures/cubemap/flowers/front.png',
      '/assets/textures/cubemap/flowers/back.png',
    ];
    const cubeLoader = new CubeTextureLoader();
    const background = await cubeLoader.loadAsync(urls);
    this.scene.background = background;
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
