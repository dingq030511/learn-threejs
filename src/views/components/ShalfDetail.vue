<template>
  <div>
    货架详情
  </div>
</template>

<script setup lang="ts">
import { Object3D } from 'three';

const props = defineProps({
  model: {
    type: Object3D,
    required: true
  }
})

console.log(props.model);
</script>

<style scoped>

</style>