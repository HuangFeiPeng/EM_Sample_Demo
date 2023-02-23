<script setup lang="ts">
import { ref, onMounted } from 'vue';
import eruda, { InitOptions } from 'eruda';
onMounted(() => {
  const el = document.getElementById('log_output') || undefined;
  eruda.init({
    container: el,
    autoScale: true,
    defaults: { displaySize: 100 },
  });
  eruda.show();
});
</script>

<template>
  <div id="log_output" class="container"></div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
