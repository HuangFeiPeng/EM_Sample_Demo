import { EaseClient } from '@/EaseIM';

const useGroupEventListenner = () => {
  EaseClient.removeEventHandler('groupEvent');
  EaseClient.addEventHandler('groupEvent', {
    onGroupEvent: (eventType) => {
      const { operation } = eventType;
      console.log('group eventType', eventType);
      switch (operation) {
        // 有新群组创建。群主的其他设备会收到该回调。
        case 'create':
          console.log('有新群组创建 create');
          break;
        // 关闭群组一键禁言。群组所有成员（除操作者外）会收到该回调。
        case 'unmuteAllMembers':
          console.log('关闭群组一键禁言 unmuteAllMembers');
          break;
        // 开启群组一键禁言。群组所有成员（除操作者外）会收到该回调。
        case 'muteAllMembers':
          console.log('开启群组一键禁言 muteAllMembers');
          break;
        // 有成员从群白名单中移出。被移出的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'removeAllowlistMember':
          console.log('有成员从群白名单中移出 removeAllowlistMember');
          break;
        // 有成员添加至群白名单。被添加的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'addUserToAllowlist':
          console.log('有成员添加至群白名单 addUserToAllowlist');
          break;
        // 删除群共享文件。群组所有成员会收到该回调。
        case 'deleteFile':
          console.log('删除群共享文件 deleteFile');
          break;
        // 上传群共享文件。群组所有成员会收到该回调。
        case 'uploadFile':
          console.log('上传群共享文件 uploadFile');
          break;
        // 删除群公告。群组所有成员会收到该回调。
        case 'deleteAnnouncement':
          console.log('删除群公告 deleteAnnouncement');
          break;
        // 更新群公告。群组所有成员会收到该回调。
        case 'updateAnnouncement':
          console.log('更新群公告 updateAnnouncement');
          break;
        // 更新群组信息，如群组名称和群组描述。群组所有成员会收到该回调。
        case 'updateInfo':
          console.log('更新群组信息 updateInfo');
          break;
        // 有成员被移出禁言列表。被解除禁言的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'unmuteMember':
          console.log('有成员被移出禁言列表 unmuteMember');
          break;
        // 有群组成员被加入禁言列表。被禁言的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'muteMember':
          console.log('有群组成员被加入禁言列表 muteMember');
          break;
        // 有管理员被移出管理员列表。群主、被移除的管理员和其他管理员会收到该回调。
        case 'removeAdmin':
          console.log('有管理员被移出管理员列表 removeAdmin');
          break;
        // 设置管理员。群主、新管理员和其他管理员会收到该回调。
        case 'setAdmin':
          console.log('设置管理员 setAdmin');
          break;
        // 转让群组。原群主和新群主会收到该回调。
        case 'changeOwner':
          console.log('转让群组 changeOwner');
          break;
        // 群组所有者和管理员拉用户进群时，无需用户确认时会触发该回调。被拉进群的用户会收到该回调。
        case 'directJoined':
          console.log(
            '群组所有者和管理员拉用户进群时，无需用户确认时会触发该回调。被拉进群的用户会收到该回调。 directJoined'
          );
          break;
        // 群成员主动退出群组。除了退群的成员，其他群成员会收到该回调。
        case 'memberAbsence':
          console.log('群成员主动退出群组 memberAbsence');
          break;
        // 有用户加入群组。除了新成员，其他群成员会收到该回调。
        case 'memberPresence':
          console.log('有用户加入群组 memberPresence');
          break;
        // 用户被移出群组。被踢出群组的成员会收到该回调。
        case 'removeMember':
          console.log('用户被移出群组 removeMember');
          break;
        // 当前用户的入群邀请被拒绝。邀请人会收到该回调。例如，用户 B 拒绝了用户 A 的入群邀请，用户 A 会收到该回调。
        case 'rejectInvite':
          console.log('当前用户的入群邀请被拒绝 rejectInvite');
          break;
        // 当前用户的入群邀请被接受。邀请人会收到该回调。例如，用户 B 接受了用户 A 的入群邀请，则用户 A 会收到该回调。
        case 'acceptInvite':
          console.log('当前用户的入群邀请被接受 acceptInvite');
          break;
        // 当前用户收到了入群邀请。受邀用户会收到该回调。例如，用户 B 邀请用户 A 入群，则用户 A 会收到该回调。
        case 'inviteToJoin':
          console.log('当前用户收到了入群邀请 inviteToJoin');
          break;
        // 当前用户的入群申请被拒绝。申请人会收到该回调。例如，用户 B 拒绝用户 A 的入群申请后，用户 A 会收到该回调。
        case 'joinPublicGroupDeclined':
          console.log('当前用户的入群申请被拒绝 joinPublicGroupDeclined');
          break;
        // 当前用户的入群申请被接受。申请人会收到该回调。例如，用户 B 接受用户 A 的入群申请后，用户 A 会收到该回调。
        case 'acceptRequest':
          console.log(' 当前用户的入群申请被接受。acceptRequest');
          break;
        // 当前用户发送入群申请。群主和群管理员会收到该回调。
        case 'requestToJoin':
          console.log('当前用户发送入群申请 requestToJoin');
          break;
        // 群组被解散。群主解散群组时，所有群成员均会收到该回调。
        case 'destroy':
          console.log('群组被解散 destroy');
          break;
        default:
          break;
      }
    },
  });
};

export default useGroupEventListenner;
