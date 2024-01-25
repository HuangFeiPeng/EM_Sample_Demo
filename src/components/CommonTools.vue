<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { EaseClient } from '@/EaseIM';
interface IbatchSendMessageOptions {
  chatType: string;
  targetId: string;
  sleep: number;
  messageContent: string;
  limit: number;
  accessToken: string;
  sendedCount: number;
}
interface IBatchSendMessage {
  [key: string]: string;
}

const BATCH_SEND_MESSAGE_TYPE: IBatchSendMessage = {
  singleChat: 'users',
  groupChat: 'chatgroups',
  chatRoom: 'chatrooms',
};
const batchSendMessageOptions = ref<IbatchSendMessageOptions>({
  targetId: '',
  chatType: 'singleChat',
  messageContent: '',
  sleep: 1000,
  limit: 100,
  accessToken: '',
  sendedCount: 0,
});
let sendedMessageIds: string[] = [];
//输出面板
const outpanel = ref<string[]>([]);

//构建请求代码
const buildRequest = () => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${batchSendMessageOptions.value.accessToken}`
  );
  const raw = JSON.stringify({
    from: 'ddd',
    to: [batchSendMessageOptions.value.targetId],
    type: 'txt',
    body: {
      msg: 'testmessages',
    },
    ext: {},
  });
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const url = `http://a1.easemob.com/${EaseClient.orgName}/${
    EaseClient.appName
  }/messages/${
    BATCH_SEND_MESSAGE_TYPE[batchSendMessageOptions.value.chatType]
  }`;
  console.log('>>>>>发起请求的url', url);
  return new Promise<any>((resolve, reject) => {
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (Object.keys(res).includes('error_description')) {
          reject(res);
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        console.log('>>>>>发起请求的error', error);
        reject(error);
      });
  });
};
//批量发送
let timer: any = null;
const actionBatchSendMessage = async () => {
  console.log('批量发送');
  ElMessage({
    type: 'success',
    message: '批量发送任务开始执行',
  });
  outpanel.value.push('批量发送任务开始执行');
  if (timer) {
    clearTimeout(timer);
  } else {
    timer = setInterval(async () => {
      if (
        batchSendMessageOptions.value.sendedCount >=
        batchSendMessageOptions.value.limit
      ) {
        clearInterval(timer);
        outpanel.value.push('批量发送任务执行结束');
        console.log('sendedMessageIds', sendedMessageIds);
      }
      try {
        const res = await buildRequest();
        console.log('>>>>>批量发送的res', res);
        const { data } = res;
        sendedMessageIds.push(data[batchSendMessageOptions.value.targetId]);
        batchSendMessageOptions.value.sendedCount += 1;
        outpanel.value.push(
          `第${batchSendMessageOptions.value.sendedCount}条消息发送成功,id:${
            data[batchSendMessageOptions.value.targetId]
          }`
        );
      } catch (error: any) {
        ElMessage({
          type: 'error',
          message: JSON.stringify(error),
        });
      }
    }, batchSendMessageOptions.value.sleep);
  }
};
</script>
<template>
  <div>
    <el-form :model="batchSendMessageOptions">
      <el-form-item label="目标ID">
        <el-input v-model="batchSendMessageOptions.targetId"></el-input>
      </el-form-item>
      <el-form-item label="聊天类型">
        <el-radio-group v-model="batchSendMessageOptions.chatType">
          <el-radio :label="'singleChat'">单聊</el-radio>
          <el-radio :label="'groupChat'">群聊</el-radio>
          <el-radio :label="'chatRoom'">聊天室</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送间隔">
        <el-input
          type="number"
          v-model="batchSendMessageOptions.sleep"
        ></el-input>
      </el-form-item>
      <el-form-item label="发送内容">
        <el-input v-model="batchSendMessageOptions.messageContent"></el-input>
      </el-form-item>
      <el-form-item label="发送数量">
        <el-input
          type="number"
          v-model="batchSendMessageOptions.limit"
        ></el-input>
      </el-form-item>
      <el-form-item label="超管TOKEN">
        <el-input v-model="batchSendMessageOptions.accessToken"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="actionBatchSendMessage"
          >批量发送</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <div class="outpanel_card">
    <div v-for="(text, index) in outpanel" :key="index">{{ text }}</div>
  </div>
</template>

<style scoped>
.outpanel_card {
  width: 80%;
  height: 300px;
  overflow-y: scroll;
  /* background-color: #000; */
}
</style>
