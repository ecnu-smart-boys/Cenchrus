<template>
  <el-card class="box-card">
    <div id="weekChart" style="width: 100%; height: 250px"></div
  ></el-card>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import * as echarts from "echarts";
import { getRecentWeek } from "@/utils";

const props = defineProps<{
  weekConsultantChart: number[];
}>();
let weekChart;
onMounted(() => {
  weekChart = echarts.init(document.getElementById("weekChart"));
  weekChart.setOption({
    title: { text: "7日咨询数量" },
    tooltip: {},
    xAxis: {
      data: getRecentWeek()
    },
    yAxis: {},
    series: [
      {
        name: "咨询数量",
        type: "line",
        data: props.weekConsultantChart,
        smooth: true
      }
    ]
  });
  window.addEventListener("resize", function () {
    weekChart.resize();
  });
});
watchEffect(() => {
  if (!weekChart) return;
  weekChart.setOption({
    title: { text: "7日咨询数量" },
    tooltip: {},
    xAxis: {
      data: getRecentWeek()
    },
    yAxis: {},
    series: [
      {
        name: "咨询数量",
        type: "line",
        data: props.weekConsultantChart,
        smooth: true
      }
    ]
  });
});
</script>

<style scoped lang="scss">
.box-card {
  min-width: 485px;
  min-height: 250px;
  margin: 0 10px 20px 10px;
}
</style>
