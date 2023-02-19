<script setup lang="ts">
import { ref } from 'vue';
let count = ref(1);

const increament: () => void = () => {
  count.value++;
};
</script>

<template>
  <div id="log_output" class="container">
    <button @click="increament">测试</button>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
