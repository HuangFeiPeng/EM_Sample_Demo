import EC, { EasemobChat } from 'easemob-websdk';
import { EASEIM_APP_KEY } from '../config';
let EaseClient = new EC.connection({
  appKey: EASEIM_APP_KEY,
});
EC.logger.setConfig({
  useCache: true, // 是否缓存
  maxCache: 3 * 1024 * 1024, // 最大缓存字节
  color: '#CCC',
  background: '#000',
});
// 缓存全部等级日志
EC.logger.setLevel(0);
EC.logger.enableAll();
const reInitEaseClient = (params: EasemobChat.ConnectionParameters) => {
  EaseClient = new EC.connection(params);
};

export { EaseClient, EC, EasemobChat, reInitEaseClient };
