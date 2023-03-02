<script setup lang="ts">
import { reactive, ref } from 'vue';
const groupManage = reactive({
  groupId: '',
});
const dialogFormVisible = ref(false);
const createGroupFrom = reactive({});
</script>
<template>
  <div class="groupmanage_container">
    <el-space direction="vertical" alignment="left">
      <div>
        <el-input v-model="groupManage.groupId" placeholder="请输入群组ID" />
      </div>
      <div>
        <el-divider content-position="left">创建和管理群组</el-divider>
        <el-button type="primary" @click="dialogFormVisible = true"
          >创建群组</el-button
        >
        <el-button type="primary">解散群组</el-button>
        <el-button type="primary">获取群组详情</el-button>
        <el-button type="primary">获取群组成员</el-button>
        <el-button type="primary">获取群组列表</el-button>
      </div>
      <div>
        <div>
          <el-divider content-position="left">基础群组操作</el-divider>
          <el-button type="primary">加入群组</el-button>
          <el-button type="primary">主动退出群组</el-button>
          <el-button type="primary">将成员移出群组</el-button>
          <el-button type="primary">变更群主</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组管理员</el-divider>
          <el-button type="primary">添加群组管理员</el-button>
          <el-button type="primary">移除群组管理员</el-button>
          <el-button type="primary">获取群组管理员列表</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组白名单</el-divider>
          <el-button type="primary">将成员加入群组白名单</el-button>
          <el-button type="primary">将成员移出群组白名单</el-button>
          <el-button type="primary">检查当前用户是否在白名单</el-button>
          <el-button type="primary">获取群组白名单</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组黑名单</el-divider>
          <el-button type="primary">将成员加入群组黑名单</el-button>
          <el-button type="primary">将成员移出群组黑名单</el-button>
          <el-button type="primary">获取群组黑名单</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-divider content-position="left">群组禁言管理</el-divider>
          <el-button type="primary">将成员加入群组禁言列表</el-button>
          <el-button type="primary">将成员移出群组禁言列表</el-button>
          <el-button type="primary">获取群组禁言列表</el-button>
          <el-button type="primary">开启群组全员禁言</el-button>
          <el-button type="primary">关闭群组全员禁言</el-button>
        </div>
      </div>
    </el-space>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="createGroupFrom">
        <el-form-item label="Promotion name">
          <!-- <el-input v-model="form.name" autocomplete="off" /> -->
        </el-form-item>
        <el-form-item label="Zones">
          <!-- <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select> -->
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
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
