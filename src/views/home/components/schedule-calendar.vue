<template>
  <el-card class="box-card">
    <el-calendar class="calendar-wrapper">
      <template #header="{ date }">
        <span>{{ date }}</span>
        <span>本月共31天，需值班17天</span>
      </template>
      <!--      <template #date-cell="{ data }">-->
      <!--        <p :class="data.isSelected ? 'is-selected' : ''">-->
      <!--          {{ data.day.split("-").slice(1).join("-") }}-->
      <!--          {{ data.isSelected ? "✔️" : "" }}-->
      <!--        </p>-->
      <!--      </template>-->
    </el-calendar>
  </el-card>
</template>

<script setup lang="ts"></script>

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
}
</style>
