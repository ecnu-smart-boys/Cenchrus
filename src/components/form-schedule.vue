<template>
  <el-form label-width="120px" label-position="top" status-icon>
    <div style="display: flex; justify-content: center">
      <el-checkbox-group v-model="checkboxGroup" size="large">
        <el-checkbox-button v-for="day in weeks" :key="day" :label="day">
          {{ day }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, watch, watchEffect } from "vue";
import { toNumSchedule } from "@/utils";

const props = defineProps<{
  scheduleData: {
    schedule: any[];
  };
}>();

const checkboxGroup = ref([]);
const scheduleData: boolean[] = reactive(new Array(7).fill(false));
const weeks = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

watch(
  () => props.scheduleData.schedule,
  () => {
    checkboxGroup.value.splice(0);
    props.scheduleData.schedule.forEach((item, index) => {
      if (item) {
        checkboxGroup.value.push(weeks[index]);
      }
    });
  },
  { immediate: true }
);

watchEffect(() => {
  for (let i = 0; i < 7; i++) {
    scheduleData[i] = false;
  }
  checkboxGroup.value.forEach((item) => {
    scheduleData[weeks.indexOf(item)] = true;
  });
});

const getScheduleData = () => {
  return toNumSchedule(scheduleData);
};

defineExpose({ getScheduleData });
</script>

<style scoped lang="scss"></style>
