<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex">
      <administrator-info />
      <today-statistic style="flex: 1" />
    </div>
    <div style="display: flex">
      <consultant-online />
      <supervisor-online style="flex: 1" />
    </div>
    <div style="display: flex">
      <month-rank style="flex-shrink: 0" />
      <month-rank style="flex-shrink: 0" />
      <week-statistic style="flex: 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdministratorInfo from "@/views/home/components/administrator/administrator-info.vue";
import SupervisorOnline from "@/views/home/components/supervisor-online.vue";
import ConsultantOnline from "@/views/home/components/consultant-online.vue";
import TodayStatistic from "@/views/home/components/administrator/today-statistic.vue";
import WeekStatistic from "@/views/home/components/administrator/week-statistic.vue";
import MonthRank from "@/views/home/components/administrator/month-rank.vue";
</script>

<style scoped lang="scss"></style>
