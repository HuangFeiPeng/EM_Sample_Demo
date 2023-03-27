<template>
  <el-button type="success" @click="dialogFormVisible = true">
    点击进行IM配置
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="appKey配置">
    <el-form :model="form">
      <el-form-item label="appKey">
        <el-input v-model="form.appKey" placeholder="请输入appKey" />
      </el-form-item>
      <el-form-item label="apiUrl">
        <el-input v-model="form.apiUrl" placeholder="isHttpDNS关闭方可配置" />
      </el-form-item>
      <el-form-item label="soceketUrl">
        <el-input v-model="form.url" placeholder="isHttpDNS关闭方可配置" />
      </el-form-item>
      <el-form-item label="isHttpDNS">
        <el-switch
          v-model="form.isHttpDNS"
          active-text="Open"
          inactive-text="Close"
        />
      </el-form-item>
      <el-form-item label="https">
        <el-switch
          v-model="form.https"
          active-text="Open"
          inactive-text="Close"
        />
      </el-form-item>
      <el-form-item label="useOwnUploadFun">
        <el-switch
          v-model="form.useOwnUploadFun"
          active-text="Open"
          inactive-text="Close"
        />
      </el-form-item>
      <el-form-item label="delivery">
        <el-switch
          v-model="form.delivery"
          active-text="Open"
          inactive-text="Close"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="initAppkeyConfig">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { EaseClient, EasemobChat, reInitEaseClient } from '@/EaseIM';
import { ElMessage } from 'element-plus';
import {
  useConnectListenner,
  useReceivedMsgListenner,
  useContactsListenner,
  useGroupEventListenner,
} from '@/EaseIM/utils';
const dialogFormVisible = ref(false);
const form: EasemobChat.ConnectionParameters = reactive({
  appKey: EaseClient.appKey,
  isHttpDNS: EaseClient.isHttpDNS,
  https: EaseClient.https,
  delivery: false,
  deviceId: EaseClient.deviceId,
  heartBeatWait: EaseClient.heartBeatWait,
  useOwnUploadFun: EaseClient.useOwnUploadFun,
  autoReconnectNumMax: EaseClient.autoReconnectNumMax,
  apiUrl: EaseClient.apiUrl,
  url: EaseClient.url,
});
// onMounted(() => {
//   form.appKey = EaseClient.appKey;
// });
//初始化配置
const initAppkeyConfig = () => {
  if (EaseClient.isOpened()) {
    EaseClient.close();
  }
  setTimeout(() => {
    reInitEaseClient(form);
    RemountEaseIMListenner();
    dialogFormVisible.value = false;
    ElMessage.success('初始化成功~');
  }, 300);
};
//重新挂载监听回调
const RemountEaseIMListenner = () => {
  useConnectListenner();
  useReceivedMsgListenner();
  useContactsListenner();
  useGroupEventListenner();
};
</script>

<style scoped></style>
