<script setup lang="ts">
import { onMounted } from 'vue';
import ConfigSdk from '@/components/Configsdk.vue';
import Setting from '@/components/Setting.vue';
import Login from '@/components/Login.vue';
import Message from '@/components/Message.vue';
import Profile from '@/components/Profile.vue';
import Contacts from '@/components/Contacts.vue';
import GroupManage from '@/components/GroupManage.vue';
import ChatRoomManage from '@/components/ChatRoomManage.vue';
import Silent from '@/components/Silent.vue';
import ReactionMessage from '@/components/ReactionMessage.vue';
import LogView from '../LogView/index.vue';
import CommonTools from '@/components/CommonTools.vue';

import {
  useConnectListenner,
  useReceivedMsgListenner,
  useContactsListenner,
  useGroupEventListenner,
  useChatRoomEventListener,
} from '@/EaseIM/utils';
import { EC, EaseClient } from '@/EaseIM';
onMounted(() => {
  useConnectListenner();
  useReceivedMsgListenner();
  useContactsListenner();
  useGroupEventListenner();
  useChatRoomEventListener();
});

const downloadIMLog = () => {
  EC.logger.download();
};
</script>

<template>
  <div class="app_container">
    <el-container>
      <el-container>
        <el-header>
          <config-sdk />
          <el-button type="primary" @click="downloadIMLog">
            下载日志
          </el-button>
          <p>当前version：{{ EaseClient.version }}</p>
          <!-- <Setting /> -->
        </el-header>
        <el-main class="left_container">
          <el-tabs tab-position="left">
            <el-tab-pane label="登录相关"><Login /></el-tab-pane>
            <el-tab-pane label="消息管理"><Message /></el-tab-pane>
            <el-tab-pane label="管理用户属性"><Profile /></el-tab-pane>
            <el-tab-pane label="管理用户关系"><Contacts /></el-tab-pane>
            <el-tab-pane label="群组相关"><GroupManage /></el-tab-pane>
            <el-tab-pane label="聊天室相关"><ChatRoomManage /></el-tab-pane>
            <el-tab-pane label="在线状态订阅">Task</el-tab-pane>
            <el-tab-pane label="Reaction"><ReactionMessage /></el-tab-pane>
            <el-tab-pane label="子区管理">Task</el-tab-pane>
            <el-tab-pane label="推送管理"><Silent /></el-tab-pane>
            <el-tab-pane label="实用工具"><CommonTools /></el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
      <!-- <el-aside class="rigth_container">
        <h1>Log OutPut</h1>
        <log-view />
      </el-aside> -->
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
  background-color: rgba(248, 250, 249, 0.682);
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
