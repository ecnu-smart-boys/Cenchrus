<template>
  <el-card class="box-card">
    <div id="todayChart" style="width: 100%; height: 200px"></div
  ></el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  const todayChart = echarts.init(document.getElementById("todayChart"));
  todayChart.setOption({
    title: { text: "今日咨询数量" },
    tooltip: {},
    xAxis: {
      data: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ]
    },
    yAxis: {},
    series: [
      {
        name: "咨询数量",
        type: "line",
        data: [
          5, 20, 36, 10, 10, 20, 0, 0, 0, 0, 0, 5, 0, 2, 3, 5, 4, 7, 10, 20, 1,
          1, 23, 0
        ],
        smooth: true
      }
    ]
  });
  window.addEventListener("resize", function () {
    todayChart.resize();
  });
});
</script>

<style scoped lang="scss">
.box-card {
  min-width: 500px;
  min-height: 200px;
  margin: 0 10px 20px 10px;
}
</style>
