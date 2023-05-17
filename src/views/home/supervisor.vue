<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex">
      <div>
        <div style="max-width: 700px; display: flex">
          <supervisor-info />
          <supervisor-statistic />
        </div>
        <supervisor-online />
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
import SupervisorInfo from "@/views/home/components/supervisor/supervisor-info.vue";
import SupervisorStatistic from "@/views/home/components/supervisor/supervisor-statistic.vue";
import SupervisorOnline from "@/views/home/components/supervisor-online.vue";
import ConsultantRecently from "@/views/home/components/consultant/consultant-recently.vue";
</script>

<style scoped lang="scss"></style>
