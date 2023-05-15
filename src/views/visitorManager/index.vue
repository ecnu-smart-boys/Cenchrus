<template>
  <div>
    <div style="display: flex">
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 20px;
        "
      >
        <div style="margin-bottom: 10px">搜索姓名</div>
        <el-input
          v-model="input2"
          placeholder="输入姓名进行搜索"
          :prefix-icon="Search"
        />
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" width="120">
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
      <el-table-column prop="gender" label="性别" width="100" />
      <el-table-column prop="username" label="用户名" width="150" />
      <el-table-column prop="phone" label="联系电话" width="150" />
      <el-table-column prop="emergencyName" label="紧急联系人" width="150" />
      <el-table-column
        prop="emergencyPhone"
        label="紧急联系人电话"
        width="200"
      />
      <el-table-column prop="time" label="注册时间" width="120" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="pageSize3"
      style="float: right; margin: 20px"
      background
      layout="prev, pager, next, jumper"
      :total="20"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";

const tableData = [
  {
    name: "Tom",
    gender: "男",
    username: "1231",
    phone: "15800000000",
    emergencyName: "Jerry",
    emergencyPhone: "15800000000",
    time: "00:12:39",
    state: "正常"
  }
];
</script>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  height: 30px;
}
</style>
