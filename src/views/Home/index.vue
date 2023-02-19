<script setup lang="ts">
import Login from '../../components/Login.vue';
import LogView from '../LogView/index.vue';
</script>

<template>
  <div class="app_container">
    <el-container>
      <el-container>
        <el-header>
          <p>环信IM Vue3 API 测试Demo</p>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
      <h1>Log OutPut</h1>
      <el-aside class="rigth_container">
        <log-view />
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.app_container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/web-demo-base.png') no-repeat;
  background-size: cover;
}
.rigth_container {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translate(-5px, -50%);
  width: 500px;
  height: 800px;
  background-color: rgb(248, 250, 249);
  filter: drop-shadow(0 0 2em #00010eaa);
  border-radius: 5px;
  overflow: hidden;
}
</style>
