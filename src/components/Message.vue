<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { EaseClient, EC, EasemobChat } from '@/EaseIM/index';
import { useReceivedMsgListenner } from '@/EaseIM/utils';
/* element plus */
import { genFileId } from 'element-plus';
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  TabsPaneContext,
} from 'element-plus';

useReceivedMsgListenner();
interface MessageForm {
  targetId: string;
  mid: string;
  chatType: EasemobChat.ChatType;
  messageType: EasemobChat.MessageType;
  content: string;
}
interface ManageServerMessageForm {
  pageNum: number;
  pageSize: number;
  chatType: 'singleChat' | 'groupChat';
  cursor: null | number | string;
  searchDirection: 'up' | 'down';
  delRomingType: 'time' | 'messageId';
  beforeTimeStamp: number;
  messageIds: string[];
}
const messageForm = reactive<MessageForm>({
  targetId: '',
  chatType: 'singleChat',
  messageType: 'txt',
  content: '',
  mid: '',
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
    .then(({ localMsgId, serverMsgId }) => {
      console.log('Send message success', localMsgId, serverMsgId);
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
  let customExts = {
    payload: {
      params: {
        status: 0,
      },
      userId: ['1367766865382436906'],
    },
    type: 5,
  };
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
    .then((res) => {
      console.log('Send message success', res);
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
  // 创建图片消息。
  let msg = EC.message.create(option);
  console.log('图片消息构建完成', msg);
  // 调用 `send` 方法发送该文本消息。
  EaseClient.send(msg)
    .then(() => {
      console.log('>>>>>发送图片消息成功');
    })
    .catch((e) => {
      console.log('>>>>>发送图片消息失败', e);
    })
    .finally(() => {
      upload.value!.clearFiles();
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

/* 管理服务端消息  */
const manageServerMessageForm = reactive<ManageServerMessageForm>({
  pageNum: 1,
  pageSize: 10,
  cursor: null,
  chatType: 'singleChat',
  searchDirection: 'up',
  delRomingType: 'time',
  beforeTimeStamp: Date.now(),
  messageIds: [],
});
//获取会话列表
const fetchConversationlistFromServer = async () => {
  //   const params = {
  //     pageNum: manageServerMessageForm.pageNum,
  //     pageSize: manageServerMessageForm.pageSize,
  //   };
  const params = {
    pageSize: manageServerMessageForm.pageSize,
    cursor: manageServerMessageForm.cursor as string,
  };
  try {
    //old fetch conversationlist function
    // const { data } = await EaseClient.getConversationlist(params);
    //new fetch conversationlist function
    const { data } = await EaseClient.getServerConversations(params);
    console.log('>>>>获取会话列表', data);
  } catch (error) {
    console.log('>>>>会话列表获取失败', error);
  }
};
//获取漫游消息
const fetchHistoryMessageFromServer = async () => {
  let options = {
    // 对方的用户 ID 或者群组 ID 或聊天室 ID。
    targetId: messageForm.targetId,
    // 每页期望获取的消息条数。取值范围为 [1,50]，默认值为 20。
    pageSize: manageServerMessageForm.pageSize,
    // 查询的起始消息 ID。若该参数设置为 `-1`、`null` 或空字符串，从最新消息开始。
    cursor: manageServerMessageForm.cursor,
    // 会话类型：（默认） `singleChat`：单聊；`groupChat`：群聊。
    chatType: manageServerMessageForm.chatType,
    // 消息搜索方向：（默认）`up`：按服务器收到消息的时间的逆序获取；`down`：按服务器收到消息的时间的正序获取。
    searchDirection: manageServerMessageForm.searchDirection,
  };
  EaseClient.getHistoryMessages(options)
    .then((res) => {
      // 成功获取历史消息。
      console.log(res);
    })
    .catch((e) => {
      // 获取失败。
      console.log('>>>>获取失败', e);
    });
};
//单向删除漫游消息
interface RemoveHistoryMessages {
  targetId: string;
  chatType: 'singleChat' | 'groupChat';
  messageIds?: string[];
  beforeTimeStamp?: number;
}
const removeHistoryMessageFromServer = async () => {
  const params: RemoveHistoryMessages = {
    targetId: messageForm.targetId,
    chatType: manageServerMessageForm.chatType,
  };
  if (manageServerMessageForm.delRomingType === 'time') {
    params.beforeTimeStamp = Date.now();
  }
  if (manageServerMessageForm.delRomingType === 'messageId') {
    params.messageIds = manageServerMessageForm.messageIds;
  }
  console.log('params', params);
  try {
    const res = await EaseClient.removeHistoryMessages(params);
    manageServerMessageForm.messageIds = [];
    console.log('>>>>>>删除成功', res);
  } catch (error) {
    console.log('>>>>>删除失败', error);
  }
};

//单向删除会话
type RmoveConversationType = {
  channel: string;
  chatType: 'singleChat' | 'groupChat';
  deleteRoam: boolean;
};
const removeConversationFromServer = async () => {
  let options: RmoveConversationType = {
    // 会话 ID：单聊为对方的用户 ID，群聊为群组 ID。
    channel: messageForm.targetId,
    // 会话类型：（默认） `singleChat`：单聊；`groupChat`：群聊。
    chatType: manageServerMessageForm.chatType,
    // 删除会话时是否同时删除服务端漫游消息。
    deleteRoam: false,
  };
  EaseClient.deleteConversation(options)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      // 删除失败。
      console.log('>>>>删除失败', e);
    });
};
//撤回消息
const recallMessageFromServer = async () => {
  let options = {
    mid: messageForm.mid,
    to: messageForm.targetId,
    chatType: messageForm.chatType,
  };
  try {
    let res = await EaseClient.recallMessage(options);
    console.log('?>??????撤回成功', res);
  } catch (error) {
    console.log('>>>>>撤回失败', error);
  }
};
</script>
<template>
  <div class="message_contaniner">
    <div>
      <h2>发送消息</h2>
      <el-form label-position="left" label-width="100px" :model="messageForm">
        <el-form-item label="目标用户" required>
          <el-input v-model="messageForm.targetId" />
        </el-form-item>
        <el-form-item label="消息id">
          <el-input v-model="messageForm.mid" />
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
          <el-button type="primary" @click="recallMessageFromServer"
            >撤回消息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div>
      <h2>管理服务端消息</h2>
      <el-form
        label-position="left"
        label-width="150px"
        :model="manageServerMessageForm"
      >
        <el-form-item label="chatType">
          <el-radio-group
            v-model="manageServerMessageForm.chatType"
            class="ml-4"
          >
            <el-radio label="singleChat" size="large">singleChat</el-radio>
            <el-radio label="groupChat" size="large">groupChat</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="pageNum">
          <el-input-number
            v-model="manageServerMessageForm.pageNum"
            :step="1"
            :min="1"
            :max="50"
          />
        </el-form-item>
        <el-form-item label="pageSize">
          <el-input-number
            v-model="manageServerMessageForm.pageSize"
            :step="10"
            :min="10"
          />
        </el-form-item>
        <el-form-item label="cursor">
          <el-input
            v-model="manageServerMessageForm.cursor"
            placeholder="默认可不写，如输入请填写消息ID"
          />
        </el-form-item>
        <el-form-item label="searchDirection">
          <el-radio-group
            v-model="manageServerMessageForm.searchDirection"
            class="ml-4"
          >
            <el-radio label="up" size="large">up</el-radio>
            <el-radio label="down" size="large">down</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="delRomingType">
          <el-radio-group
            v-model="manageServerMessageForm.delRomingType"
            class="ml-4"
          >
            <el-radio label="time" size="large">按照时间</el-radio>
            <el-radio label="messageId" size="large">按照消息ID</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="manageServerMessageForm.delRomingType === 'time'">
          <el-date-picker
            v-model="manageServerMessageForm.beforeTimeStamp"
            type="datetime"
            placeholder="选择起始时间"
          />
        </el-form-item>
        <el-form-item
          v-show="manageServerMessageForm.delRomingType === 'messageId'"
        >
          <el-select
            v-model="manageServerMessageForm.messageIds"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="填写消息ID"
          >
            <el-option
              v-for="item in manageServerMessageForm.messageIds"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="仅需要调整pageSize和pageNum"
            placement="top-start"
          >
            <el-button type="primary" @click="fetchConversationlistFromServer">
              会话列表
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="需传入targetId/pageSize/cursor/searchDirection"
            placement="top-start"
          >
            <el-button type="primary" @click="fetchHistoryMessageFromServer">
              获取漫游消息
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="需传入targetId/chatType/beforeTimeStamp或者messageIds"
            placement="top-start"
          >
            <el-button type="primary" @click="removeHistoryMessageFromServer">
              单向删除漫游消息
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="需传入targetId/chatType"
            placement="top-start"
          >
            <el-button type="primary" @click="removeConversationFromServer">
              单向删除会话
            </el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.message_contaniner {
  width: 50%;
  max-height: 500px;
  overflow-y: auto;
}
</style>
