<template>
  <el-card class="box-card">
    <el-row style="height: 200px; align-items: center; justify-content: center">
      <el-col :span="12">
        <el-statistic title="今日咨询数" :value="todayConsultantNumber" />
      </el-col>
      <el-col :span="12">
        <el-statistic title="今日咨询时长" :value="todayConsultantTime" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  todayConsultantNumber: number;
  todayConsultantTime: string;
}>();
</script>

<style scoped lang="scss">
.box-card {
  height: 220px;
  min-width: 340px;
  margin: 0 10px 20px 10px;

  .el-col {
    text-align: center;
  }

  .el-statistic {
    --el-statistic-content-font-size: 2em;
    --el-statistic-title-font-size: 1em;
  }
}
</style>
<style>
.el-statistic__head {
  margin-bottom: 15px;
}
</style>
