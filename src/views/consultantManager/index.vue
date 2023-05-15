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
      <el-table-column prop="gender" label="性别" width="80" />
      <el-table-column prop="duration" label="总咨询时长" width="120" />
      <el-table-column prop="count" label="总咨询次数" width="120" />
      <el-table-column prop="supervisor" label="绑定督导" width="180" />
      <el-table-column prop="schedule" label="排班" width="180" />
      <el-table-column prop="rate" label="咨询评级" width="180">
        <template #default="scope">
          <el-rate v-model="scope.row.rate" size="large" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default>
          <el-button link type="primary" size="small">修改</el-button>
          <el-button link type="primary" size="small">排班</el-button>
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
    count: 100,
    duration: "00:12:39",
    supervisor: "111,222,333",
    schedule: "111,222,333",
    state: "正常",
    rate: 3
  }
];
</script>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  height: 30px;
}
</style>
