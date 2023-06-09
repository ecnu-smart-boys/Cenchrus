<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <slot></slot>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%" :show-header="false">
      <el-table-column prop="rank" label="排名" width="50" />
      <el-table-column prop="name" label="姓名" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <img
              :src="scope.row.avatar"
              class="avatar"
              onerror="this.src='/src/assets/defaultAvatar.jpg'"
            />
            <div style="margin-left: 10px">{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total" label="咨询次数" width="100" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { RankUserInfo } from "@/apis/conversation/conversation-interface";
import { reactive, watchEffect } from "vue";

const props = defineProps<{
  rankInfo: RankUserInfo[];
}>();
const tableData = reactive([]);

watchEffect(() => {
  tableData.splice(0);
  props.rankInfo.forEach((item, index) => {
    tableData.push({
      ...item,
      rank: index + 1
    });
  });
});
</script>

<style scoped lang="scss">
.box-card {
  width: 300px;
  margin: 0 10px 20px 0;
}
.avatar {
  border-radius: 50%;
  height: 30px;
}
</style>
