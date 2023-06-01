<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { EaseClient, EC, EasemobChat } from '@/EaseIM/index';
interface IsilentForm {
  paramType: 0;
  remindType: EasemobChat.SILENTMODETYPE;
}
const silentForm: IsilentForm = {
  paramType: 0,
  remindType: 'ALL' as EasemobChat.SILENTMODETYPE,
};
//设置单个会话的推送通知
interface IsilentModeForConversation {
  conversationId: string;
  type: EasemobChat.CONVERSATIONTYPE;
  options: EasemobChat.SilentModeParamType;
}
const setSingleSessionPush = async () => {
  const params: IsilentModeForConversation = {
    conversationId: 'pfh',
    type: 'singleChat' as EasemobChat.CONVERSATIONTYPE,
    options: {
      paramType: silentForm.paramType,
      remindType: 'ALL' as EasemobChat.SILENTMODETYPE,
    },
  };
  try {
    console.log('params', params);
    let res = await EaseClient.setSilentModeForConversation(params);
    console.log('>>>>>设置成功', res);
  } catch (error) {
    console.log('>>>>设置失败', error);
  }
};
</script>
<template>
  <div class="slient_contaniner">
    <el-form label-position="left" label-width="100px" :model="silentForm">
      <el-form-item label="管理推送配置">
        <el-button type="primary" @click="setSingleSessionPush"
          >设置单个会话的推送通知</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
