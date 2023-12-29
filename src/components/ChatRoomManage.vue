<script setup lang="ts">
import { reactive, ref } from 'vue';
import { EaseClient, EasemobChat } from '@/EaseIM';
import { ElMessage } from 'element-plus';
const chatRoomManage = reactive({
  chatRoomId: '',
  pageSize: 20,
  pageNum: 1,
  username: '',
});
//获取聊天室列表
const getChatRoomList = async () => {
  const option = {
    pagenum: chatRoomManage.pageNum,
    pagesize: chatRoomManage.pageSize,
  };
  try {
    const res = await EaseClient.getChatRooms(option);
    console.log('>>>>>>>>', res.data);
    ElMessage({ type: 'success', message: '聊天室列表获取成功' });
  } catch (error) {
    console.log('>>>>聊天室列表获取异常', error);
    ElMessage({ type: 'error', message: '聊天室列表获取异常' });
  }
};
//加入聊天室
const joinChatRoom = async () => {
  let option = {
    roomId: chatRoomManage.chatRoomId,
    message: 'reason',
  };
  try {
    await EaseClient.joinChatRoom(option);
    ElMessage({ type: 'success', message: '加入聊天室成功！' });
  } catch (error) {
    ElMessage({ type: 'error', message: '加入异常！' });
  }
};
//获取指定聊天室详情
const getChatRoomDetail = async () => {
  const option = {
    chatRoomId: chatRoomManage.chatRoomId,
  };
  try {
    const res = await EaseClient.getChatRoomDetails(option);
    console.log('>>>>>>>>', res.data);
    ElMessage({ type: 'success', message: '聊天室详情获取成功' });
  } catch (error) {
    console.log('>>>>聊天室详情获取异常', error);
    ElMessage({ type: 'error', message: '聊天室详情获取异常' });
  }
};
</script>
<template>
  <div class="chatroom_manage_container">
    <el-space direction="vertical" alignment="left">
      <div>
        <el-row>
          <el-col>
            <span>聊天室ID：</span>
            <el-input
              style="width: 200px"
              v-model="chatRoomManage.chatRoomId"
              placeholder="请输入群组ID"
            />
          </el-col>
          <el-col>
            <span>pageNum：</span>
            <el-input-number v-model="chatRoomManage.pageNum" />
          </el-col>
          <el-col>
            <span>pageSize：</span>
            <el-input-number v-model="chatRoomManage.pageSize" />
          </el-col>
        </el-row>
      </div>
      <!-- 创建和管理群组 -->
      <div>
        <el-divider content-position="left">创建和管理群组</el-divider>
        <el-button type="primary" @click="joinChatRoom">加入聊天室</el-button>
        <el-button type="primary" @click="getChatRoomList"
          >获取聊天室列表</el-button
        >
        <el-button type="primary" @click="getChatRoomDetail"
          >获取指定聊天室详情</el-button
        >
      </div>
    </el-space>
  </div>
</template>

<style scoped>
.chatroom_manage_container {
  width: 70%;
}
</style>
