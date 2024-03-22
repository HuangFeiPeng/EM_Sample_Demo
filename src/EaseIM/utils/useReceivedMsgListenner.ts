import { EaseClient, EasemobChat, EC } from '../index';
const sendReadAck = (message: EasemobChat.MessageBody) => {
  console.log('>>>>>执行发送回执');
  let option = {
    type: 'read', // 消息是否已读。
    chatType: 'groupChat', // 会话类型，这里为群聊。
    id: message.id, // 需要发送已读回执的消息 ID。
    to: message.to, // 群组 ID。
    ackContent: JSON.stringify({ readed: true }), // 回执内容。
  } as EasemobChat.CreateReadMsgParameters;
  console.log('>>>>>发送回执参数', option);
  let msg = EC.message.create(option);
  EaseClient.send(msg);
};
const useReceivedMsgListnner = () => {
  const msgListnerFunc = {
    // 当前用户收到文本消息。
    onTextMessage: (message: EasemobChat.TextMsgBody) => {
      console.log('收到文本消息', message);
      const { id } = message;
      if (message.msgConfig?.allowGroupAck) {
        sendReadAck(message);
      }
    },
    // 当前用户收到图片消息。
    onImageMessage: (message: EasemobChat.ImgMsgBody) => {
      console.log('收到图片消息', message);
    },
    // 当前用户收到透传消息。
    onCmdMessage: (message: EasemobChat.CmdMsgBody) => {
      console.log('收到透传消息', message);
    },
    // 当前用户收到语音消息。
    onAudioMessage: (message: EasemobChat.AudioMsgBody) => {
      console.log('收到语音消息', message);
    },
    // 当前用户收到位置消息。
    onLocationMessage: (message: EasemobChat.LocationMsgBody) => {
      console.log('收到位置消息', message);
    },
    // 当前用户收到文件消息。
    onFileMessage: (message: EasemobChat.FileMsgBody) => {
      console.log('收到文件消息', message);
    },
    // 当前用户收到自定义消息。
    onCustomMessage: (message: EasemobChat.CustomMsgBody) => {
      console.log('收到自定义消息', message);
    },
    // 当前用户收到视频消息。
    onVideoMessage: (message: EasemobChat.VideoMsgBody) => {
      console.log('收到视频消息', message);
    },
    onRecallMessage: (message: EasemobChat.RecallMsgBody) => {
      console.log('收到撤回消息', message);
    },
    onCombineMessage: (message: EasemobChat.CombineMsgBody) => {
      console.log('收到合并转发消息', message);
    },
    onModifiedMessage: (message: EasemobChat.ModifiedMsg) => {
      console.log('收到编辑消息', message);
    },
    onMessage: (messageList: any) => {
      console.log('>>>>>>收到批量消息回调', messageList);
    },
    onReactionChange: (reactionMsg: EasemobChat.ReactionMessage) => {
      console.log('>>>>>收到回应消息回调', reactionMsg);
    },
    onReadMessage: (message: EasemobChat.ReadMsgBody) => {
      console.log('>>>>>收到已读回执', message);
    },
  };
  EaseClient.removeEventHandler('receivedMsgEvent');
  EaseClient.addEventHandler('receivedMsgEvent', msgListnerFunc);
};

export default useReceivedMsgListnner;
