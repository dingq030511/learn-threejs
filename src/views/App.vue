<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { World } from '../world/index';

  onMounted(async () => {
    const world = new World('#container');
    // await world.init();
    world.start();
  });
</script>

<style>
  #container {
    width: 100%;
    height: 100%;
  }
</style>
