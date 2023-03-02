<script setup lang="ts">
import { ref } from 'vue';
import { EaseClient, EasemobChat, reInitEaseClient } from '@/EaseIM';
import {
  useConnectListenner,
  useReceivedMsgListenner,
  useContactsListenner,
} from '@/EaseIM/hooks';
let appKey = ref(EaseClient.appKey);
const changeAppkey = () => {
  if (EaseClient.isOpened()) {
    EaseClient.close();
  }
  setTimeout(() => {
    let params: EasemobChat.ConnectionParameters = {
      appKey: appKey.value,
    };
    reInitEaseClient(params);
    appKey.value = EaseClient.appKey;
    RemountEaseIMListenner();
  }, 300);
};
//重新挂载监听回调
const RemountEaseIMListenner = () => {
  useConnectListenner();
  useReceivedMsgListenner();
  useContactsListenner();
};
</script>
<template>
  <div class="setting_container">
    <el-input
      style="width: 300px"
      v-model="appKey"
      placeholder="请输入appKey"
    ></el-input>
    <el-button @click="changeAppkey" type="primary">点击初始化实例</el-button>
  </div>
</template>

<style scoped>
.setting_container {
  width: 50%;
  height: 50px;
  line-height: 50px;
}
</style>
