<script setup lang="ts">
import { reactive } from 'vue';
import { EaseClient } from '@/EaseIM';
import useLoginStore from '@/stores/login';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
/* IM listen */
import { useConnectListenner } from '@/EaseIM/hooks/';
useConnectListenner();
const loginStore = useLoginStore();
const loginEaseIMFrom = reactive({
  username: '',
  password: '',
  accessToken: '',
});
const ruleForm = reactive<FormRules>({
  username: [
    { min: 1, max: 50, message: 'Length should be 3 to 5', trigger: 'change' },
  ],
  password: [
    { message: '请输入密码', trigger: 'change' },
    { min: 1, max: 50, message: 'Length should be 3 to 5', trigger: 'change' },
  ],
  accessToken: [
    { min: 1, max: 60, message: 'Length should be 3 to 5', trigger: 'change' },
  ],
});
//登录IM
const loginEaseIM = async () => {
  console.log('1111');
  if (loginStore.loginState) {
    ElMessage({ type: 'warning', message: '已登录，请勿重复登录！' });
    return;
  }
  try {
    let { accessToken } = await EaseClient.open({
      user: loginEaseIMFrom.username,
      pwd: loginEaseIMFrom.password,
    });
    console.log('accessToken', accessToken);
  } catch (error: any) {
    ElMessage({
      type: 'warning',
      message: `login error:${error.data.message}`,
    });
  }
};
//注册
const registerEaseIM = async () => {
  try {
    await EaseClient.registerUser({
      username: loginEaseIMFrom.username,
      password: loginEaseIMFrom.password,
    });
  } catch (error) {
    console.log(error);
  }
};
//Token登录
const loginEaseIMWithToken = async () => {
  try {
    await EaseClient.open({
      user: loginEaseIMFrom.username,
      accessToken: loginEaseIMFrom.accessToken,
    });
  } catch (error) {
    ElMessage({ type: 'error', message: `${error}` });
    return;
  }
};
//退出登录
const logoutEaseIM = () => {
  EaseClient.close();
  loginEaseIMFrom.username = '';
  loginEaseIMFrom.password = '';
};
</script>
<template>
  <div class="login_contaniner">
    <el-form
      :model="loginEaseIMFrom"
      :rules="ruleForm"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="环信ID：" prop="username">
        <el-input v-model="loginEaseIMFrom.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="loginEaseIMFrom.password"></el-input>
      </el-form-item>
      <el-form-item label="accessToken：" prop="accessToken">
        <el-input v-model="loginEaseIMFrom.accessToken"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginEaseIM"> 登录 </el-button>
        <el-button type="success" @click="loginEaseIMWithToken"
          >Token登录</el-button
        >
        <el-button type="warning" @click="registerEaseIM">注册</el-button>
        <el-button type="danger" @click="logoutEaseIM">退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login_contaniner {
  width: 50%;
}
</style>
