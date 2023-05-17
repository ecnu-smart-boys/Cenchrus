<template>
  <el-card class="box-card">
    <div id="weekChart" style="width: 100%; height: 250px"></div
  ></el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  const weekChart = echarts.init(document.getElementById("weekChart"));
  weekChart.setOption({
    title: { text: "7日咨询数量" },
    tooltip: {},
    xAxis: {
      data: ["12/01", "12/02", "12/03", "12/04", "12/05", "12/06", "12/07"]
    },
    yAxis: {},
    series: [
      {
        name: "咨询数量",
        type: "line",
        data: [5, 20, 36, 10, 10, 20, 0],
        smooth: true
      }
    ]
  });
  window.addEventListener("resize", function () {
    weekChart.resize();
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
