import EC, { EasemobChat } from 'easemob-websdk';
import { EASEIM_APP_KEY } from '../config';
let EaseClient = new EC.connection({
  appKey: EASEIM_APP_KEY,
});

export { EaseClient, EC, EasemobChat };
