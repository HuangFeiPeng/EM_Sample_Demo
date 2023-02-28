<script setup lang="ts">
import { reactive } from 'vue';
import { EaseClient } from '@/EaseIM';
const contactsForm = reactive({
  targetId: '',
});
//获取好友列表
const fetchContactsUserList = async () => {
  try {
    let { data } = await EaseClient.getContacts();
    console.log('>>>>>列表获取成功', data);
  } catch (error) {
    console.log('error', error);
  }
};
//添加好友
const addContactWithServer = () => {
  EaseClient.addContact(contactsForm.targetId, '加个好友呗');
  contactsForm.targetId = '';
};
//删除好友
const removeContactWithServer = () => {
  EaseClient.deleteContact(contactsForm.targetId);
  contactsForm.targetId = '';
};

//获取黑名单列表
const fetchBlackListUserList = async () => {
  try {
    let { data } = await EaseClient.getBlocklist();
    console.log('>>>>>黑名单获取成功', data);
  } catch (error) {
    console.log('>>>>>黑名单列表获取失败', error);
  }
};
//添加用户至黑名单
const addUserToBlackList = () => {
  EaseClient.addUsersToBlocklist({ name: contactsForm.targetId });
};
//从黑名单内将用户移出
const removeUserFromBlockList = () => {
  EaseClient.removeUserFromBlockList(contactsForm.targetId);
};
</script>

<template>
  <div class="contacts_container">
    <el-form label-position="left" label-width="100px" :model="contactsForm">
      <el-form-item label="Target Id">
        <el-input v-model="contactsForm.targetId" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchContactsUserList"
          >获取好友列表</el-button
        >
        <el-button type="primary" @click="addContactWithServer"
          >添加好友</el-button
        >
        <el-button type="primary" @click="removeContactWithServer"
          >删除好友</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchBlackListUserList"
          >获取黑名单列表</el-button
        >
        <el-button type="primary" @click="addUserToBlackList"
          >添加用户至黑名单</el-button
        >
        <el-button type="primary" @click="removeUserFromBlockList"
          >将用户移出黑名单</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.contacts_container {
  width: 50%;
  max-height: 500px;
  overflow-y: auto;
}
</style>
