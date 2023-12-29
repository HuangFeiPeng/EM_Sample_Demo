import { EaseClient } from '@/EaseIM';

const useChatRoomEventListenner = () => {
  console.log('>>>>聊天室事件监听已挂载');
  EaseClient.removeEventHandler('chatRoomEvent');
  EaseClient.addEventHandler('chatRoomEvent', {
    onChatroomEvent: (event) => {
      switch (event.operation) {
        // 解除聊天室一键禁言。聊天室所有成员（除操作者外）会收到该事件。
        case 'unmuteAllMembers':
          break;
        // 聊天室一键禁言。聊天室所有成员（除操作者外）会收到该事件。
        case 'muteAllMembers':
          break;
        // 将成员移出聊天室白名单。被移出的成员收到该事件。
        case 'removeAllowlistMember':
          break;
        // 添加成员至聊天室白名单。被添加的成员收到该事件。
        case 'addUserToAllowlist':
          break;
        // 删除聊天室公告。聊天室的所有成员会收到该事件。
        case 'deleteAnnouncement':
          break;
        // 更新聊天室公告。聊天室的所有成员会收到该事件。
        case 'updateAnnouncement':
          break;
        // 更新聊天室详情。聊天室的所有成员会收到该事件。
        case 'updateInfo':
          break;
        // 解除对指定成员的禁言。被解除禁言的成员会收到该事件。
        case 'unmuteMember':
          break;
        // 有成员被移出聊天室黑名单。被移出的成员会收到该事件。
        case 'unblockMember':
          break;
        // 禁言指定成员。被禁言的成员会收到该事件。
        case 'muteMember':
          break;
        // 移除管理员。被移除的管理员会收到该事件。
        case 'removeAdmin':
          break;
        // 设置管理员。被添加的管理员会收到该事件。
        case 'setAdmin':
          break;
        // 转让聊天室。聊天室全体成员会收到该事件。
        // case 'changeOwner':
        //   break;
        // 解散聊天室。聊天室的所有成员会收到该事件。
        case 'destroy':
          break;
        // 主动退出聊天室。聊天室的所有成员（除退出的成员）会收到该事件。
        case 'memberAbsence':
          console.log('%c有成员退出天室 memberAbsence', 'color:red', event);
          break;
        // 有用户加入聊天室。聊天室的所有成员（除新成员外）会收到该事件。
        case 'memberPresence':
          console.log('%c有用户加入聊天室 memberPresence', 'color:blue', event);
          break;
        // 有成员被移出聊天室。被踢出聊天室的成员会收到该事件。
        case 'removeMember':
          break;

        // 有成员修改/设置聊天室自定义属性，聊天室的所有成员会收到该事件。
        case 'updateChatRoomAttributes':
          break;
        // 有成员删除聊天室自定义属性，聊天室所有成员会收到该事件。
        case 'removeChatRoomAttributes':
          break;
        default:
          break;
      }
    },
  });
};

export default useChatRoomEventListenner;
