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
      loginStore.changeLoginState(true);
    },
    onDisconnected: () => {
      console.log('disconnected');
      ElMessage({
        message: 'IM 已断开！',
        type: 'warning',
      });
      loginStore.changeLoginState(false);
    },
    onError: (error: any) => {
      console.log('error', error);
    },
    onOnline: () => {
      console.log('>>>>>>>Online');
    },
    onOffline: () => {
      console.log('>>>>>>>Offline');
    },
  };
  EaseClient.removeEventHandler('connectEvent');
  EaseClient.addEventHandler('connectEvent', connectListenFunc);
};
export default useConnectListenner;
