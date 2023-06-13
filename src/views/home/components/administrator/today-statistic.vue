<template>
  <el-card class="box-card">
    <div id="todayChart" style="width: 100%; height: 200px"></div
  ></el-card>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  todayConsultantChart: number[];
}>();
let todayChart;
onMounted(() => {
  todayChart = echarts.init(document.getElementById("todayChart"));
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
        data: props.todayConsultantChart,
        smooth: true
      }
    ]
  });
  window.addEventListener("resize", function () {
    todayChart.resize();
  });
});
watchEffect(() => {
  console.log(props.todayConsultantChart);
  if (!todayChart) return;
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
        data: props.todayConsultantChart,
        smooth: true
      }
    ]
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
