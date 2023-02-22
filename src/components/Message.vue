<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { EaseClient, EC, EasemobChat } from '@/EaseIM/index';
import { useReceivedMsgListenner } from '@/EaseIM/hooks';
/* element plus */
import { genFileId } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
useReceivedMsgListenner();
interface MessageForm {
  targetId: string;
  chatType: EasemobChat.ChatType;
  messageType: EasemobChat.MessageType;
  content: string;
}
const messageForm = reactive<MessageForm>({
  targetId: '',
  chatType: 'singleChat',
  messageType: 'txt',
  content: '',
});

//发送文本消息
const sendTextMessage = () => {
  let option: EasemobChat.CreateTextMsgParameters = {
    // 消息类型。
    type: 'txt',
    // 消息内容。
    msg: messageForm.content,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: messageForm.targetId,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: messageForm.chatType,
  };
  // 创建文本消息。
  let msg = EC.message.create(option);
  // 调用 `send` 方法发送该文本消息。
  EaseClient.send(msg)
    .then(() => {
      console.log('Send message success');
    })
    .catch((e) => {
      console.log('Send message fail', e);
    });
};
//发送坐标消息
const sendLocationMessage = () => {
  let option: EasemobChat.CreateLocationMsgParameters = {
    // 消息类型。
    type: 'loc',
    // 消息内容。
    addr: '四通桥',
    buildingName: '数码大厦A座',
    lat: 111,
    lng: 111,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: messageForm.targetId,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: messageForm.chatType,
  };
  // 创建文本消息。
  let msg = EC.message.create(option);
  // 调用 `send` 方法发送该文本消息。
  EaseClient.send(msg)
    .then(() => {
      console.log('Send message success');
    })
    .catch((e) => {
      console.log('Send message fail', e);
    });
};

//发送自定义消息
const sendCustomMessage = () => {
  // 自定义事件。
  let customEvent = 'customEvent';
  // 通过键值对设置自定义消息内容。
  let customExts = {};
  let option: EasemobChat.CreateCustomMsgParameters = {
    // 消息类型。
    type: 'custom',
    // 消息内容。
    customEvent,
    customExts,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: messageForm.targetId,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: messageForm.chatType,
  };
  // 创建文本消息。
  let msg = EC.message.create(option);
  // 调用 `send` 方法发送该文本消息。
  EaseClient.send(msg)
    .then(() => {
      console.log('Send message success');
    })
    .catch((e) => {
      console.log('Send message fail', e);
    });
};
/* 附件类消息 */
const sourceFile = ref<File>();
const upload = ref<UploadInstance>();
const isShowUploadFile = computed(() => {
  if (
    messageForm.messageType !== 'txt' &&
    messageForm.messageType !== 'loc' &&
    messageForm.messageType !== 'custom'
  ) {
    return true;
  } else {
    return false;
  }
});
const handleExceed: UploadProps['onExceed'] = (files) => {
  console.log('handleExceed', files[0]);
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const getFile: UploadProps['onChange'] = (files) => {
  sourceFile.value = files['raw'];
};
//发送图片消息
const sendImageMessage = () => {
  const fileObj: EasemobChat.FileObj = {
    url: '',
    filename: sourceFile.value!.name,
    filetype: sourceFile.value!.type,
    data: sourceFile.value as File,
  };
  let option: EasemobChat.CreateImgMsgParameters = {
    // 消息类型。
    type: 'img',
    // 消息内容。
    file: fileObj,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: messageForm.targetId,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: messageForm.chatType,
  };
  // 创建文本消息。
  let msg = EC.message.create(option);
  // 调用 `send` 方法发送该文本消息。
  EaseClient.send(msg)
    .then(() => {
      console.log('>>>>>发送图片消息成功');
    })
    .catch((e) => {
      console.log('>>>>>发送图片消息失败', e);
    });
};
//发送文件消息
const sendFileMessage = () => {
  const fileObj: EasemobChat.FileObj = {
    url: '',
    filename: sourceFile.value!.name,
    filetype: sourceFile.value!.type,
    data: sourceFile.value as File,
  };
  let option: EasemobChat.CreateFileMsgParameters = {
    // 消息类型。
    type: 'file',
    // 消息内容。
    file: fileObj,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: messageForm.targetId,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: messageForm.chatType,
  };
  let msg = EC.message.create(option);
  EaseClient.send(msg)
    .then(() => {
      console.log('>>>发送文件消息成功');
    })
    .catch((e) => {
      console.log('>>>发送文件消息失败', e);
    });
};
//发送音频消息
const sendAudioMessage = () => {};
//发送视频消息
const sendVideoMessage = () => {};
</script>
<template>
  <div class="message_contaniner">
    <div>
      <el-form label-position="left" label-width="100px" :model="messageForm">
        <el-form-item label="目标用户" required>
          <el-input v-model="messageForm.targetId" />
        </el-form-item>
        <el-form-item label="聊天类型">
          <el-radio-group v-model="messageForm.chatType">
            <el-radio :label="'singleChat'">一对一单聊</el-radio>
            <el-radio :label="'groupChat'">多人群聊</el-radio>
            <el-radio :label="'chatRoom'">松散聊天室</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="消息类型">
          <el-radio-group v-model="messageForm.messageType">
            <el-radio :label="'txt'">文本消息</el-radio>
            <el-radio :label="'loc'">坐标消息</el-radio>
            <el-radio :label="'custom'">自定义消息</el-radio>
            <el-radio :label="'img'">图片消息</el-radio>
            <el-radio :label="'audio'">音频消息</el-radio>
            <el-radio :label="'video'">视频消息</el-radio>
            <el-radio :label="'file'">文件消息</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 文本输入内容 -->
        <el-form-item
          label="文本消息内容"
          v-show="messageForm.messageType === 'txt'"
        >
          <el-input
            v-model="messageForm.content"
            maxlength="30"
            placeholder="请输入消息内容..."
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item v-show="isShowUploadFile">
          <el-upload
            ref="upload"
            class="upload-demo"
            :limit="1"
            :on-change="getFile"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">select file</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip text-red">仅容许上传一个文件。</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <!-- 文本消息 -->
          <el-button
            v-show="messageForm.messageType === 'txt'"
            type="primary"
            @click="sendTextMessage"
          >
            发送文本消息
          </el-button>
          <!-- 坐标消息 -->
          <el-button
            v-show="messageForm.messageType === 'loc'"
            type="primary"
            @click="sendLocationMessage"
          >
            发送坐标消息
          </el-button>
          <!-- 自定义消息 -->
          <el-button
            v-show="messageForm.messageType === 'custom'"
            type="primary"
            @click="sendCustomMessage"
          >
            发送自定义消息
          </el-button>
          <!-- 图片消息 -->
          <el-button
            v-show="messageForm.messageType === 'img'"
            type="primary"
            @click="sendImageMessage"
          >
            发送图片消息
          </el-button>
          <!-- 音频消息 -->
          <el-button
            v-show="messageForm.messageType === 'audio'"
            type="primary"
            @click="sendAudioMessage"
          >
            发送音频消息
          </el-button>
          <!-- 视频消息 -->
          <el-button
            v-show="messageForm.messageType === 'video'"
            type="primary"
            @click="sendAudioMessage"
          >
            发送视频消息
          </el-button>
          <!-- 文件消息 -->
          <el-button
            v-show="messageForm.messageType === 'file'"
            type="primary"
            @click="sendFileMessage"
          >
            发送文件消息
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.message_contaniner {
  width: 50%;
  height: 100%;
}
</style>
