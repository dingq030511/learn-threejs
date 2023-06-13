<template>
  <div ref="containerRef" class="detail-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Color, DirectionalLight, Object3D, OrthographicCamera, Scene, WebGLRenderer } from 'three';

const props = defineProps({
  model: {
    type: Object3D,
    required: true,
  },
});

const containerRef = ref<HTMLDivElement>();

onMounted(() => {
  const container = containerRef.value!;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const k = width / height;
  const s = 150;
  const scene = new Scene();
  const cube = props.model.clone();
  cube.scale.set(10, 10, 10);
  scene.add(cube);
  const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200, 300, 200);
  camera.lookAt(scene.position);
  const light = new DirectionalLight('white', 1);
  light.position.set(10, 10, 10);
  scene.add(light);
  const renderer = new WebGLRenderer();
  scene.background = new Color('skyblue');
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  container.appendChild(renderer.domElement);
});
</script>

<style scoped>
.detail-container {
  height: 600px;
}
</style>
