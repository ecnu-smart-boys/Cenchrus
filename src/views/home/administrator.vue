<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex">
      <administrator-info
        :today-consultant-number="todayConsultantNumber"
        :today-consultant-time="todayConsultantTime"
      />
      <today-statistic
        style="flex: 1"
        :today-consultant-chart="todayConsultantChart"
      />
    </div>
    <div style="display: flex">
      <consultant-online />
      <supervisor-online style="flex: 1" />
    </div>
    <div style="display: flex">
      <month-rank style="flex-shrink: 0">
        <span>当月咨询数量排行</span>
      </month-rank>
      <month-rank style="flex-shrink: 0">
        <span>当月好评数量排行</span>
      </month-rank>
      <week-statistic
        style="flex: 1"
        :week-consultant-chart="weekConsultantChart"
      />
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
import { computed, onMounted, ref } from "vue";
import {
  ConversationInfo,
  DayConsultInfo
} from "@/apis/conversation/conversation-interface";
import {
  getRecentWeek,
  getTodayConsultations
} from "@/apis/conversation/conversation";
import { parseTime } from "@/utils";

const conversationInfo = ref<ConversationInfo[]>([]);
const dayConsultInfo = ref<DayConsultInfo[]>([]);
onMounted(async () => {
  conversationInfo.value = await getTodayConsultations();
  dayConsultInfo.value = await getRecentWeek();
  dayConsultInfo.value.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
});

let todayConsultantNumber = computed(() => {
  return conversationInfo.value.length;
});

let todayConsultantTime = computed(() => {
  const rawTime = conversationInfo.value.reduce((before, item) => {
    return before + item.endTime - item.startTime;
  }, 0);
  return parseTime(rawTime / 1000);
});

let todayConsultantChart = computed(() => {
  const result = new Array(24).fill(0);
  conversationInfo.value.forEach((i) => {
    result[new Date(i.startTime).getHours() - 1]++;
  });
  return result;
});

let weekConsultantChart = computed(() => {
  return dayConsultInfo.value.map((i) => i.consultationCount);
});
</script>

<style scoped lang="scss"></style>
