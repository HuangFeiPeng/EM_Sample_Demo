<script setup lang="ts">
import Login from '@/components/Login.vue';
import Message from '@/components/Message.vue';
import Profile from '@/components/Profile.vue';
import LogView from '../LogView/index.vue';
</script>

<template>
  <div class="app_container">
    <el-container>
      <el-container>
        <el-header>
          <p>环信IM Vue3 API 测试Demo</p>
        </el-header>
        <el-main class="left_container">
          <el-tabs tab-position="left">
            <el-tab-pane label="登录相关"><Login /></el-tab-pane>
            <el-tab-pane label="消息管理"><Message /></el-tab-pane>
            <el-tab-pane label="管理用户属性"><Profile /></el-tab-pane>
            <el-tab-pane label="管理用户关系">Task</el-tab-pane>
            <el-tab-pane label="群组相关">Task</el-tab-pane>
            <el-tab-pane label="聊天室相关">Task</el-tab-pane>
            <el-tab-pane label="在线状态订阅">Task</el-tab-pane>
            <el-tab-pane label="Reaction">Task</el-tab-pane>
            <el-tab-pane label="子区管理">Task</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
      <el-aside class="rigth_container">
        <h1>Log OutPut</h1>
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
.left_container {
  /* width: calc(100% - 600px); */
  min-height: 800px;
  background-color: rgba(248, 250, 249, 0.295);
  /* filter: drop-shadow(0 0 2em #00010eaa); */
  /* border-radius: 5px; */
  /* overflow: hidden; */
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
