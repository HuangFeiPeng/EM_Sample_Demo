import { onUnmounted } from 'vue';
import { EaseClient } from '@/EaseIM';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useContactsStore } from '@/stores/contacts';
const contactsStore = useContactsStore();
const useContactsListenner = () => {
  const onUserInvite = async (userId: string): Promise<void> => {
    try {
      await ElMessageBox.confirm('收到好友邀请，是否同意？', 'Warning', {
        confirmButtonText: '同意',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      });
      contactsStore.acceptFriendInvite(userId);
      ElMessage.success('接受成功');
    } catch (error) {
      console.log('>>>>取消');
      contactsStore.refuseFriendInvite(userId);
      ElMessage.error('拒绝申请');
    }
  };
  EaseClient.addEventHandler('contactsEvent', {
    // 当前用户收到好友请求。用户 B 向用户 A 发送好友请求，用户 A 收到该事件。
    onContactInvited: function (msg) {
      console.log('>>>>收到好友申请', msg);
      onUserInvite(msg.from);
    },
    // 当前用户被其他用户从联系人列表上移除。用户 B 将用户 A 从联系人列表上删除，用户 A 收到该事件。
    onContactDeleted: function (msg) {
      console.log('>>>收到好友关系解除', msg);
    },
    // 当前用户新增了联系人。用户 B 向用户 A 发送好友请求，用户 A 同意该请求，用户 A 收到该事件，而用户 B 收到 `onContactAgreed` 事件。
    onContactAdded: function (msg) {
      console.log('>>>>好友已添加上', msg);
    },
    // 当前用户发送的好友请求被拒绝。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，拒绝加好友，则用户 A 收到该事件。
    onContactRefuse: function (msg) {
      console.log('>>>>好友申请被拒绝', msg);
    },
    // 当前用户发送的好友请求经过了对方同意。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，同意加好友，则用户 A 收到该事件。
    onContactAgreed: function (msg) {
      console.log('>>>>好友申请已同意', msg);
    },
  });
  onUnmounted(() => {
    EaseClient.removeEventHandler('contactsEvent');
  });
};

export default useContactsListenner;
