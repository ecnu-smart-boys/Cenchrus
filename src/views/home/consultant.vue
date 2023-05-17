<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex">
      <div style="max-width: 700px">
        <consultant-info />
        <consultant-statistic />
      </div>
      <schedule-calendar />
    </div>
    <div style="display: flex">
      <consultant-recently />
    </div>
  </div>
</template>

<script setup lang="ts">
import ScheduleCalendar from "@/views/home/components/schedule-calendar.vue";
import ConsultantInfo from "@/views/home/components/consultant/consultant-info.vue";
import ConsultantStatistic from "@/views/home/components/consultant/consultant-statistic.vue";
import ConsultantRecently from "@/views/home/components/consultant/consultant-recently.vue";
</script>

<style scoped lang="scss"></style>
