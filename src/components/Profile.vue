<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EaseClient, EasemobChat } from '@/EaseIM';
const targetId = ref('');
const profileForm = reactive<EasemobChat.UpdateOwnUserInfoParams>({
  nickname: '',
  avatarurl: '',
  phone: '',
  mail: '',
  gender: '0',
  sign: '',
  birth: '',
  ext: '',
});
//设置当前用户属性
const setLoginUserProfile = async () => {
  try {
    let { data } = await EaseClient.updateUserInfo({ ...profileForm });
    console.log('>>>设置成功', data);
  } catch (error) {
    console.log('>>>>设置失败', error);
  }
};
//获取用户属性
const fetchUserProfile = async () => {
  try {
    let { data } = await EaseClient.fetchUserInfoById(targetId.value);
    console.log('>>>>>获取用户属性成功', data);
  } catch (error) {
    console.log('>>>>获取用户属性失败', error);
  }
};
</script>

<template>
  <div class="profile_container">
    <el-form label-position="left" label-width="100px" :model="profileForm">
      <el-form-item label="用户ID">
        <el-input v-model="targetId" placeholder="目标ID" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="profileForm.nickname" />
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="profileForm.avatarurl">
          <template #prepend>Http\s://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="profileForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="profileForm.mail" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="profileForm.birth" />
      </el-form-item>
      <el-form-item label="生日">
        <el-input v-model="profileForm.ext" />
      </el-form-item>
      <el-form-item label="扩展">
        <el-input v-model="profileForm.ext" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setLoginUserProfile">
          设置当前用户属性
        </el-button>
        <el-tooltip content="填写要获取的用户ID">
          <el-button type="primary" @click="fetchUserProfile">
            获取用户属性
          </el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.profile_container {
  width: 50%;
  max-height: 500px;
  overflow-y: auto;
}
</style>
