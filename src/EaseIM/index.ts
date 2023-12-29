import EC, { EasemobChat } from 'easemob-websdk';
import { EASEIM_APP_KEY } from '../config';
let EaseClient = new EC.connection({
  appKey: EASEIM_APP_KEY,
});
EC.logger.enableAll();
const reInitEaseClient = (params: EasemobChat.ConnectionParameters) => {
  EaseClient = new EC.connection(params);
};

export { EaseClient, EC, EasemobChat, reInitEaseClient };
