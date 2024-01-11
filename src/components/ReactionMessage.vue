<script setup lang="ts">
import { reactive } from 'vue';
import { EaseClient } from '@/EaseIM';
interface IreactionMessageForm {
  messageId: string;
  reactionKey: string;
  chatType: 'singleChat' | 'groupChat';
  pageSize: number;
  cursor?: string;
  groupId: string;
}
const reactionMessageForm = reactive<IreactionMessageForm>({
  messageId: '',
  reactionKey: '',
  chatType: 'singleChat',
  pageSize: 20,
  cursor: '',
  groupId: '',
});
const addNewReactionToMessage = async () => {
  try {
    await EaseClient.addReaction({
      messageId: reactionMessageForm.messageId,
      reaction: reactionMessageForm.reactionKey,
    });
    console.log('>>>>添加reaction成功');
  } catch (error) {
    console.log(error);
  }
};
const removeReactionFromMessage = async () => {
  try {
    await EaseClient.deleteReaction({
      messageId: reactionMessageForm.messageId,
      reaction: reactionMessageForm.reactionKey,
    });
    console.log('>>>删除reaction成功');
  } catch (error) {
    console.log(error);
  }
};
const fetchReactionMessageList = async () => {
  try {
    const res = await EaseClient.getReactionlist({
      messageId: reactionMessageForm.messageId,
      chatType: reactionMessageForm.chatType,
    });
    console.log('>>>>>Reaction 列表拉取成功', res);
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="reaction_container">
    <el-form
      label-position="left"
      label-width="100px"
      :model="reactionMessageForm"
    >
      <el-form-item label="消息id">
        <el-input
          v-model="reactionMessageForm.messageId"
          placeholder="消息ID"
        />
      </el-form-item>
      <el-form-item label="reactionKey">
        <el-input
          v-model="reactionMessageForm.reactionKey"
          placeholder="reactionKey"
        />
      </el-form-item>
      <el-form-item label="群ID">
        <el-input v-model="reactionMessageForm.groupId" placeholder="群组ID" />
      </el-form-item>
      <el-form-item label="Cursor">
        <el-input
          v-model="reactionMessageForm.cursor"
          placeholder="获取ReactionCursor"
        />
      </el-form-item>
      <el-form-item label="chatType">
        <el-radio-group v-model="reactionMessageForm.chatType" class="ml-4">
          <el-radio label="singleChat" size="large">singleChat</el-radio>
          <el-radio label="groupChat" size="large">groupChat</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNewReactionToMessage">
          在消息上添加 Reaction
        </el-button>
        <el-tooltip content="填写要获取的用户ID">
          <el-button type="primary" @click="removeReactionFromMessage">
            删除消息的 Reaction
          </el-button>
        </el-tooltip>
        <el-button type="primary" @click="fetchReactionMessageList">
          获取消息的 Reaction 列表
        </el-button>
        <el-button type="primary"> 获取 Reaction 详情 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.reaction_container {
  width: 50%;
  max-height: 500px;
  overflow-y: auto;
}
</style>
