import { defineStore } from 'pinia';
import { EaseClient } from '@/EaseIM';
export const useContactsStore = defineStore('contacts', {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    acceptFriendInvite(userId: string) {
      EaseClient.acceptContactInvite(userId);
    },
    refuseFriendInvite(userId: string) {
      EaseClient.declineContactInvite(userId);
    },
  },
});
