import { onUnmounted } from 'vue';
import { EaseClient } from '../index';
import useLoginStore from '@/stores/login';
import { ElMessage } from 'element-plus';
const loginStore = useLoginStore();
const useConnectListenner = () => {
  const connectListenFunc = {
    onConnected: () => {
      console.log('connected');
      ElMessage({
        message: 'IM 已链接',
        type: 'success',
      });
      loginStore.changeLoginState();
    },
    onDisconnected: () => {
      console.log('disconnected');
      ElMessage({
        message: 'IM 已断开！',
        type: 'warning',
      });
      loginStore.changeLoginState();
    },
    onError: () => {
      console.log('error');
    },
  };
  EaseClient.addEventHandler('connectEvent', connectListenFunc);
  onUnmounted(() => {
    console.log('>>>>组件卸载取消监听。');
    EaseClient.removeEventHandler('connectEvent');
  });
};
export default useConnectListenner;
