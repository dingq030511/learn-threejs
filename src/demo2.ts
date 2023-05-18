import { Scene, BoxGeometry, MeshLambertMaterial, Mesh, PointLight, OrthographicCamera, WebGLRenderer } from 'three';

/**
 * 创建场景
 */
const scene = new Scene();

/**
 * 创建立方体几何对象
 */
const geometry = new BoxGeometry(100, 100, 100);

/**
 * 创建材质对象
 */
const material = new MeshLambertMaterial({
  color: 0x00ff00,
});

/**
 * 网格模型对象
 */
const mesh = new Mesh(geometry, material);

scene.add(mesh);

/**
 * 添加光源
 */
const point = new PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 300;

/**
 * 添加相机
 */
const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(270, 100, 200);
camera.lookAt(scene.position);

const renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
  mesh.rotateY(0.01);
  requestAnimationFrame(render);
}

render();
