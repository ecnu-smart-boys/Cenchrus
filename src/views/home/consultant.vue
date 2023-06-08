<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex">
      <div style="max-width: 700px">
        <consultant-info
          :total-consultations="totalConsultations"
          :current-count="currentMaxConsultantCount"
          :today-consultant-session="todayConsultantSession"
        />
        <consultant-statistic
          :today-consultant-number="todayConsultantNumber"
          :today-consultant-time="todayConsultantTime"
          :today-consultant-session="todayConsultantSession"
        />
      </div>
      <schedule-calendar :arrangement-info="arrangementInfo" />
    </div>
    <div style="display: flex">
      <consultant-recently :consult-records="consultRecords" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ScheduleCalendar from "@/views/home/components/schedule-calendar.vue";
import ConsultantInfo from "@/views/home/components/consultant/consultant-info.vue";
import ConsultantStatistic from "@/views/home/components/consultant/consultant-statistic.vue";
import ConsultantRecently from "@/views/home/components/consultant/consultant-recently.vue";
import { computed, onMounted, ref } from "vue";
import {
  ConsultRecordsResp,
  ConversationInfo
} from "@/apis/conversation/conversation-interface";
import {
  getRecentConsultations,
  getTodayOwnConsultations
} from "@/apis/conversation/conversation";
import { parseTime } from "@/utils";
import { personalArrangement } from "@/apis/arrangement/arrangement";

const conversationInfo = ref<ConversationInfo[]>([]);
const consultRecords = ref<ConsultRecordsResp>();
const arrangementInfo = ref<number[]>([]);
onMounted(async () => {
  conversationInfo.value = await getTodayOwnConsultations();
  consultRecords.value = await getRecentConsultations();
  arrangementInfo.value = await personalArrangement();
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

let todayConsultantSession = 4;
let currentMaxConsultantCount = 5;

let totalConsultations = computed(() => {
  return consultRecords.value?.total;
});
</script>

<style scoped lang="scss"></style>
