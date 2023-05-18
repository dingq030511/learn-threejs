import { Scene, BoxGeometry, MeshLambertMaterial, Mesh, PointLight, OrthographicCamera, WebGLRenderer } from 'three';
import { GUI } from 'lil-gui';

const geometryParams = {
  width: 100,
  height: 100,
  depth: 100,
};

/**
 * 创建场景
 */
const scene = new Scene();

/**
 * 创建立方体几何对象
 */
const geometry = new BoxGeometry(geometryParams.width, geometryParams.height, geometryParams.depth);

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

function updateCamera() {
  // console.log(mesh.geometry.parameters.width);
  mesh.scale.set(
    geometryParams.width / mesh.geometry.parameters.width,
    geometryParams.height / mesh.geometry.parameters.height,
    geometryParams.depth / mesh.geometry.parameters.depth
  );
  renderer.render(scene, camera);
}

const gui = new GUI();

gui.add(geometryParams, 'width', 10, 1000, 5).onChange(updateCamera);

const renderer = new WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);
