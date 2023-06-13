<template>
  <div ref="containerRef" class="detail-container">
    <Button class="rotate-btn" type="primary" @click="rotate">翻转</Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Box3, DirectionalLight, Object3D, OrthographicCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { createDragControls } from '../../systems/dragControls';
import { createAxesHelper } from '../../systems/axes-helper';
import { Button } from 'ant-design-vue';
const props = defineProps({
  model: {
    type: Object3D,
    required: true,
  },
});

const containerRef = ref<HTMLDivElement>();

const shalf = props.model.clone();
const scene = new Scene();
const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true
});
let camera: OrthographicCamera;
onMounted(() => {
  const container = containerRef.value!;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const k = width / height;
  const s = 150;
  shalf.position.set(0,0,0);
  shalf.scale.set(0.1, 0.1, 0.1);
  const box = new Box3().setFromObject(shalf);
  const center = box.getCenter(new Vector3());
  shalf.position.sub(center);
  scene.add(shalf);
  camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(-30, 20, 200);
  camera.lookAt(scene.position);
  const light = new DirectionalLight('white', 1);
  light.position.set(10, 10, 10);
  scene.add(light);
  const axesHelper = createAxesHelper()
  scene.add(axesHelper);
  const controls = createDragControls([shalf], camera, renderer.domElement)
  controls.addEventListener('drag',()=>{
    renderer.render(scene, camera);
  })
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  container.appendChild(renderer.domElement);
});

function rotate(){
  shalf.rotateZ(Math.PI);
  renderer.render(scene, camera);
}
</script>

<style scoped>
.detail-container {
  position: relative;
  height: 600px;
}
.rotate-btn{
  position: absolute;
  bottom: 100%;
  right: 0;
}
</style>
