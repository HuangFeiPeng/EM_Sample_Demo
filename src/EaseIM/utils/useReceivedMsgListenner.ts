import { EaseClient, EasemobChat } from '../index';
const useReceivedMsgListnner = () => {
  const msgListnerFunc = {
    // 当前用户收到文本消息。
    onTextMessage: (message: EasemobChat.TextMsgBody) => {
      console.log('收到文本消息', message);
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
    // 当前用户订阅的其他用户的在线状态更新。
  };
  EaseClient.removeEventHandler('receivedMsgEvent');
  EaseClient.addEventHandler('receivedMsgEvent', msgListnerFunc);
};

export default useReceivedMsgListnner;
