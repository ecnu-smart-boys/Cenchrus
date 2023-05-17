<template>
  <div style="display: flex">
    <el-calendar style="flex: 4">
      <template #date-cell="{ data }">
        <div
          style="
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: small;
            height: 100%;
          "
        >
          <div class="calendar-date">{{ data.day.split("-")[2] }}</div>
          <div>管理员 2</div>
          <div>督导 2</div>
        </div>
      </template>
    </el-calendar>
    <div style="flex: 1">
      <el-table :data="tableData" :show-header="false">
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
        <el-table-column fixed="right" label="操作" width="160">
          <template #default>
            <el-button link type="primary" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  height: 30px;
}
.calendar-date {
  color: white;
  background-color: #89c9ff;
  padding: 5px;
  position: absolute;
  top: -8px;
  left: -8px;
}
</style>
<style lang="scss">
.el-calendar-table .el-calendar-day:hover {
  .calendar-date {
    background-color: #40a8ff;
  }
}
</style>
