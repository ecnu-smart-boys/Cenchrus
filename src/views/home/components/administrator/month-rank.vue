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
              src="https://img1.baidu.com/it/u=4259218938,3459520686&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              class="avatar"
            />
            <div style="margin-left: 10px">{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="咨询次数" width="100" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
const tableData = [
  {
    rank: 1,
    name: "Tom",
    count: 120
  },
  {
    rank: 2,
    name: "Tom",
    count: 120
  },
  {
    rank: 3,
    name: "Tom",
    count: 120
  },
  {
    rank: 4,
    name: "Tom",
    count: 120
  }
];
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
