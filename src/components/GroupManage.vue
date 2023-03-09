<script setup lang="ts">
import { reactive, ref } from 'vue';
import { EaseClient, EasemobChat } from '@/EaseIM';
import { FormInstance } from 'element-plus';
interface CreateGroupFrom {
  groupname: string;
  desc: string;
  members: string[];
  public: boolean;
  approval: boolean;
  allowinvites: boolean;
  inviteNeedConfirm: boolean;
  maxusers: number;
  ext?: string;
}
const groupManage = reactive({
  groupId: '',
  pageSize: 20,
  pageNum: 0,
  username: '',
});
const dialogFormVisible = ref(false);
const createGroupFrom = reactive<CreateGroupFrom>({
  groupname: '',
  desc: '',
  members: [],
  public: true,
  approval: false,
  allowinvites: false,
  inviteNeedConfirm: false,
  maxusers: 200,
  ext: '',
});
//创建群组
const createGroupRef = ref<FormInstance>();
const createNewGroup = async (formEl: FormInstance | undefined) => {
  try {
    let res = await EaseClient.createGroup({ data: { ...createGroupFrom } });
    console.log('>>>>群组创建完毕', res);
  } catch (error) {
    console.log('>>>>群组创建失败', error);
  } finally {
    if (!formEl) return;
    formEl.resetFields();
    dialogFormVisible.value = false;
  }
};
const cannelCreateGroup = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  dialogFormVisible.value = false;
};
//解散群组
const destoryGroup = async () => {
  try {
    let res = await EaseClient.destroyGroup({
      groupId: groupManage.groupId,
    });
    console.log('>>>>>群组已销毁', res);
    groupManage.groupId = '';
  } catch (error) {
    console.log('>>>销毁失败', error);
  }
};
//获取群组详情
const fetchGroupInfos = async () => {
  try {
    let { data } = await EaseClient.getGroupInfo({
      groupId: groupManage.groupId,
    });
    console.log(data);
  } catch (error) {
    console.log('>>>群组详情获取失败', error);
  }
};
//获取群组列表
const fetchGroupList = async () => {
  try {
    let { entities } = await EaseClient.getJoinedGroups({
      pageNum: groupManage.pageNum,
      pageSize: groupManage.pageSize,
      needRole: true,
    });
    console.log('>>>>群列表获取成功', entities);
  } catch (error) {
    console.log('>>>>群列表获取失败', error);
  }
};
//获取群成员列表
const fetchGroupMembersList = async () => {
  let option = {
    pageNum: groupManage.pageNum + 1, // 页码 该接口由于需要正数 所以原有从0开始的pageNum直接+1
    pageSize: groupManage.pageSize,
    groupId: groupManage.groupId,
  };
  try {
    let { data } = await EaseClient.listGroupMembers(option);
    console.log('>>>>获取群组列表成功', data);
  } catch (error) {
    console.log('>>>>获取群组成员失败', error);
  }
};

//加入群组
const joinGroups = async () => {
  let option = {
    groupId: groupManage.groupId,
    message: 'I am Tom',
  };
  try {
    let res = await EaseClient.joinGroup(option);
    console.log('加入群组成功过', res);
  } catch (error) {
    console.log('>>>>>加入失败', error);
  }
};
//主动退出群组
const quitGroups = async () => {
  let option = {
    groupId: groupManage.groupId,
  };
  try {
    await EaseClient.leaveGroup(option);
    console.log('>>>>>退出成功');
  } catch (error) {
    console.log('>>>>>>退出失败', error);
  }
};

//将群成员移出群组，此接口可以批量 方法名为removeGroupMembers
const removeGroupMember = async () => {
  let option = {
    groupId: groupManage.groupId,
    username: groupManage.username,
  };
  try {
    let { data } = await EaseClient.removeGroupMember(option);
    console.log('>>>>>移出群组成功', data);
  } catch (error) {
    console.log('>>>>>>移出群组失败', error);
  }
};
//变更群主
const changeGroupOwner = async () => {
  let option = {
    groupId: groupManage.groupId,
    newOwner: groupManage.username,
  };
  try {
    let { data } = await EaseClient.changeGroupOwner(option);
    console.log('>>>>>变更群主成功', data);
  } catch (error) {
    console.log('>>>>>>变更群主失败', error);
  }
};
/* 管理员相关 */
//获取群组管理员列表
const fetchGroupAdminList = async () => {
  let option = {
    groupId: groupManage.groupId,
  };
  try {
    let { data } = await EaseClient.getGroupAdmin(option);
    console.log('>>>>获取管理员列表', data);
  } catch (error) {
    console.log('error', error);
  }
};
//添加群组管理员
const addGroupAdmin = async () => {
  let option = {
    groupId: groupManage.groupId,
    username: groupManage.username,
  };
  try {
    let { data } = await EaseClient.setGroupAdmin(option);
    console.log('>>>>>添加群组管理员成功', data);
  } catch (error) {
    console.log('>>>>>>添加群组管理员失败', error);
  }
};
//移除群组管理员
const removeGroupAdmin = async () => {
  let option = {
    groupId: groupManage.groupId,
    username: groupManage.username,
  };
  try {
    let { data } = await EaseClient.removeGroupAdmin(option);
    console.log('>>>>>移除群组管理员成功', data);
  } catch (error) {
    console.log('>>>>>>移除群组管理员失败', error);
  }
};
/* 群组白名单 */
//获取群组白名单
const fetchGroupAllowList = async () => {
  let option = {
    groupId: groupManage.groupId,
  };
  try {
    let { data } = await EaseClient.getGroupAllowlist(option);
    console.log('>>>>获取群组白名单', data);
  } catch (error) {
    console.log('>>>>获取群组白名单失败', error);
  }
};
//将成员加入群组白名单
interface AddGroupMemberAllowlist {
  groupId: string;
  users: string[];
}
const addGroupMemberAllowlist = async () => {
  let option: AddGroupMemberAllowlist = {
    groupId: groupManage.groupId,
    users: [],
  };
  option.users.push(groupManage.username);
  try {
    let { data } = await EaseClient.addUsersToGroupAllowlist(option);
    console.log('>>>>>加入群组白名单成功', data);
  } catch (error) {
    console.log('>>>>>>加入群组白名单失败', error);
  }
};
//将成员移出群组白名单
const removeGroupMembersFromAllowlist = async () => {
  let option = {
    groupId: groupManage.groupId,
    userName: groupManage.username,
  };
  try {
    let { data } = await EaseClient.removeGroupAllowlistMember(option);
    console.log('>>>>>移出群组白名单成功', data);
  } catch (error) {
    console.log('>>>>>>>移出群组白名单失败', error);
  }
};
//检测当前用户是否在群组白名单
const checkGroupMemberAllowlist = async () => {
  let option = {
    groupId: groupManage.groupId,
    userName: EaseClient.user,
  };
  try {
    let { data } = await EaseClient.isInGroupAllowlist(option);
    console.log('>>>>>检测当前用户是否在群组白名单成功', data);
  } catch (error) {
    console.log('>>>>>>检测当前用户是否在群组白名单失败', error);
  }
};
/* 群黑名单 */
//获取群组黑名单
const fetchGroupBlacklist = async () => {
  let option = {
    groupId: groupManage.groupId,
  };
  try {
    let { data } = await EaseClient.getGroupBlocklist(option);
    console.log('>>>>获取群组黑名单', data);
  } catch (error) {
    console.log('>>>>获取群组黑名单失败', error);
  }
};
//将成员加入群组黑名单
interface GroupMemberBlacklist {
  groupId: string;
  usernames: string[];
}
const addGroupMemberBlacklist = async () => {
  let option: GroupMemberBlacklist = {
    groupId: groupManage.groupId,
    usernames: [],
  };
  option.usernames.push(groupManage.username);
  try {
    let { data } = await EaseClient.blockGroupMembers(option);
    console.log('>>>>>加入群组黑名单成功', data);
  } catch (error) {
    console.log('>>>>>>加入群组黑名单失败', error);
  }
};

//将成员移出群组黑名单
const removeGroupMembersFromBlacklist = async () => {
  let option: GroupMemberBlacklist = {
    groupId: groupManage.groupId,
    usernames: [],
  };
  option.usernames.push(groupManage.username);
  try {
    let { data } = await EaseClient.unblockGroupMembers(option);
    console.log('>>>>>移出群组黑名单成功', data);
  } catch (error) {
    console.log('>>>>>>>移出群组黑名单失败', error);
  }
};

/* 群禁言 */
//获取群组禁言列表
const fetchGroupMuteList = async () => {
  let option = {
    groupId: groupManage.groupId,
  };
  try {
    let { data } = await EaseClient.getGroupMutelist(option);
    console.log('>>>>获取群组禁言列表', data);
  } catch (error) {
    console.log('>>>>获取群组禁言列表失败', error);
  }
};
//将成员加入群组禁言列表
const addGroupMemberMuteList = async () => {
  let option = {
    groupId: groupManage.groupId,
    username: groupManage.username,
    muteDuration: 886400000,
  };
  try {
    let { data } = await EaseClient.muteGroupMember(option);
    console.log('>>>>>加入群组禁言列表成功', data);
  } catch (error) {
    console.log('>>>>>>加入群组禁言列表失败', error);
  }
};
//将成员移出群组禁言列表
const removeGroupMembersFromMuteList = async () => {
  let option = {
    groupId: groupManage.groupId,
    username: groupManage.username,
  };
  try {
    let { data } = await EaseClient.unmuteGroupMember(option);
    console.log('>>>>>移出群组禁言列表成功', data);
  } catch (error) {
    console.log('>>>>>>>移出群组禁言列表失败', error);
  }
};
//开启群组全员禁言
const muteGroupAll = async () => {
  let option = {
    groupId: groupManage.groupId,
  };
  try {
    let { data } = await EaseClient.disableSendGroupMsg(option);
    console.log('>>>>>开启群组全员禁言成功', data);
  } catch (error) {
    console.log('>>>>>>开启群组全员禁言失败', error);
  }
};
//关闭群组全员禁言
const unmuteGroupAll = async () => {
  let option = {
    groupId: groupManage.groupId,
  };
  try {
    let { data } = await EaseClient.enableSendGroupMsg(option);
    console.log('>>>>>关闭群组全员禁言成功', data);
  } catch (error) {
    console.log('>>>>>>关闭群组全员禁言失败', error);
  }
};
</script>
<template>
  <div class="groupmanage_container">
    <el-space direction="vertical" alignment="left">
      <div>
        <el-row>
          <el-col>
            <span>群组ID：</span>
            <el-input
              style="width: 200px"
              v-model="groupManage.groupId"
              placeholder="请输入群组ID"
            />
          </el-col>
          <el-col>
            <span>pageNum：</span>
            <el-input-number v-model="groupManage.pageNum" />
          </el-col>
          <el-col>
            <span>pageSize：</span>
            <el-input-number v-model="groupManage.pageSize" />
          </el-col>
          <el-col>
            <span>成员ID：</span>
            <el-input style="width: 200px" v-model="groupManage.username" />
          </el-col>
        </el-row>
      </div>
      <div>
        <!-- 创建和管理群组 -->
        <div>
          <el-divider content-position="left">创建和管理群组</el-divider>
          <el-button type="primary" @click="dialogFormVisible = true"
            >创建群组</el-button
          >
          <el-button type="primary" @click="destoryGroup">解散群组</el-button>
          <el-button type="primary" @click="fetchGroupInfos"
            >获取群组详情</el-button
          >
          <el-button type="primary" @click="fetchGroupList"
            >获取群组列表</el-button
          >
          <el-button type="primary" @click="fetchGroupMembersList"
            >获取群组成员</el-button
          >
        </div>
        <!-- 基础群组操作 -->
        <div>
          <el-divider content-position="left">基础群组操作</el-divider>
          <el-button type="primary" @click="joinGroups">加入群组</el-button>
          <el-button type="primary" @click="quitGroups">主动退出群组</el-button>
          <el-button type="primary" @click="removeGroupMember"
            >将成员移出群组</el-button
          >
          <el-button type="primary" @click="changeGroupOwner"
            >变更群主</el-button
          >
        </div>
        <!-- 群管理 -->
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组管理员</el-divider>
          <el-button type="primary" @click="fetchGroupAdminList"
            >获取群组管理员列表</el-button
          >
          <el-button type="primary" @click="addGroupAdmin"
            >添加群组管理员</el-button
          >
          <el-button type="primary" @click="removeGroupAdmin"
            >移除群组管理员</el-button
          >
        </div>
        <!-- 群组白名单 -->
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组白名单</el-divider>
          <el-button type="primary" @click="fetchGroupAllowList"
            >获取群组白名单</el-button
          >
          <el-button type="primary" @click="addGroupMemberAllowlist"
            >将成员加入群组白名单</el-button
          >
          <el-button type="primary" @click="removeGroupMembersFromAllowlist"
            >将成员移出群组白名单</el-button
          >
          <el-button type="primary" @click="checkGroupMemberAllowlist"
            >检查当前用户是否在白名单</el-button
          >
        </div>
        <!-- 群黑名单 -->
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组黑名单</el-divider>
          <el-button type="primary" @click="fetchGroupBlacklist"
            >获取群组黑名单</el-button
          >
          <el-button type="primary" @click="addGroupMemberBlacklist"
            >将成员加入群组黑名单</el-button
          >
          <el-button type="primary" @click="removeGroupMembersFromBlacklist"
            >将成员移出群组黑名单</el-button
          >
        </div>
        <!-- 群禁言 -->
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组禁言管理</el-divider>
          <el-button type="primary" @click="fetchGroupMuteList"
            >获取群组禁言列表</el-button
          >
          <el-button type="primary" @click="addGroupMemberMuteList"
            >将成员加入群组禁言列表</el-button
          >
          <el-button type="primary" @click="removeGroupMembersFromMuteList"
            >将成员移出群组禁言列表</el-button
          >
          <el-button type="primary" @click="muteGroupAll"
            >开启群组全员禁言</el-button
          >
          <el-button type="primary" @click="unmuteGroupAll"
            >关闭群组全员禁言</el-button
          >
        </div>
      </div>
    </el-space>
    <el-dialog v-model="dialogFormVisible" title="创建群组">
      <el-form :model="createGroupFrom" ref="createGroupRef">
        <el-form-item prop="groupname" label="群组名">
          <el-input v-model="createGroupFrom.groupname" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="desc" label="群详情">
          <el-input v-model="createGroupFrom.desc" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="要邀请的群成员">
          <el-input v-model="createGroupFrom.members" autocomplete="off" />
        </el-form-item> -->
        <el-form-item prop="public" label="是否为公开群">
          <el-radio-group v-model="createGroupFrom.public" class="ml-4">
            <el-radio :label="true">公开群</el-radio>
            <el-radio :label="false">私有群</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="approval"
          v-if="createGroupFrom.public"
          label="入群申请是否需要审批"
        >
          <el-radio-group v-model="createGroupFrom.approval" class="ml-4">
            <el-radio :label="true">需要审批</el-radio>
            <el-radio :label="false">不需要审批</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="!createGroupFrom.public"
          label="是否允许普通群成员邀请人入群"
          prop="allowinvites"
        >
          <el-radio-group v-model="createGroupFrom.allowinvites" class="ml-4">
            <el-radio :label="true">容许</el-radio>
            <el-radio :label="false">不容许</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="inviteNeedConfirm"
          label="邀请加群时是否需要受邀用户确认"
        >
          <el-radio-group
            v-model="createGroupFrom.inviteNeedConfirm"
            class="ml-4"
          >
            <el-radio :label="true">需要</el-radio>
            <el-radio :label="false">不需要</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="maxusers" label="群组最大成员数">
          <el-input-number
            v-model="createGroupFrom.maxusers"
            :min="200"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cannelCreateGroup(createGroupRef)">
            取消创建
          </el-button>
          <el-button type="primary" @click="createNewGroup(createGroupRef)"
            >确认创建</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.groupmanage_container {
  width: 70%;
}
</style>
