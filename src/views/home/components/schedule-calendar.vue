<template>
  <el-card class="box-card">
    <el-calendar class="calendar-wrapper" :range="calendarRange">
      <template #header>
        <span>{{
          now.getFullYear() + "年" + (now.getMonth() + 1) + "月"
        }}</span>
        <span>{{
          "本月共" +
          calendarRange[1].getDate() +
          "天，需值班" +
          arrangementInfo.length +
          "天"
        }}</span>
      </template>
      <template #date-cell="{ data }">
        <div
          style="
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: small;
            height: 100%;
          "
        >
          <div
            :class="
              parseInt(data.day.split('-')[1]) === now.getMonth() + 1
                ? 'calendar-date-current'
                : 'calendar-date'
            "
          >
            {{ data.day.split("-")[2] }}
          </div>
          <div
            v-if="parseInt(data.day.split('-')[1]) === now.getMonth() + 1"
            style="color: #40a8ff"
          >
            <div
              v-if="arrangementInfo.includes(parseInt(data.day.split('-')[2]))"
            >
              <el-icon><UserFilled /></el-icon>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup lang="ts">
import { UserFilled } from "@element-plus/icons-vue";

const now = new Date();
const calendarRange = [
  new Date(now.getFullYear(), now.getMonth(), 1),
  new Date(now.getFullYear(), now.getMonth() + 1, 0)
];
const props = defineProps<{
  arrangementInfo: number[];
}>();
</script>

<style scoped lang="scss">
.box-card {
  min-width: 400px;
  height: 480px;
  margin: 0 10px 20px;

  .calendar-wrapper {
    width: 100%;
    height: 100%;
    --el-calendar-cell-width: 53px;
  }

  .calendar-date-current {
    color: white;
    background-color: #89c9ff;
    padding: 5px;
    position: absolute;
    top: -8px;
    left: -8px;
  }

  .calendar-date {
    color: white;
    background-color: #c9c9c9;
    padding: 5px;
    position: absolute;
    top: -8px;
    left: -8px;
  }
}
</style>
<style lang="scss">
.el-calendar-table .el-calendar-day:hover {
  .calendar-date-current {
    background-color: #40a8ff;
  }
}
</style>
