<template>
  <div style="display: flex">
    <el-calendar ref="calendar" v-model="currentDate" style="flex: 4">
      <template #header="{ date }">
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-month')">
            上个月
          </el-button>
          <el-button size="small" @click="selectDate('today')">今日</el-button>
          <el-button size="small" @click="selectDate('next-month')">
            下个月
          </el-button>
        </el-button-group>
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
          <div class="calendar-date">{{ data.day.split("-")[2] }}</div>
          <div v-if="data.type === 'current-month'">
            <div>
              咨询师
              {{ monthData[data.day.split("-")[2] - 1]?.consultants || 0 }}
            </div>
            <div>
              督导 {{ monthData[data.day.split("-")[2] - 1]?.supervisors || 0 }}
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
    <div
      style="
        width: 230px;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <el-menu
        :default-active="activeIndex"
        style="margin-bottom: 20px; width: 100%"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">咨询师</el-menu-item>
        <el-menu-item index="2">督导</el-menu-item>
      </el-menu>
      <el-button
        v-if="activeIndex == '1'"
        type="plain"
        text
        :icon="Plus"
        @click="handleAddConsultant"
      >
        添加咨询师
      </el-button>
      <el-button
        v-if="activeIndex == '2'"
        type="plain"
        text
        :icon="Plus"
        @click="handleAddSupervisor"
      >
        添加督导
      </el-button>
      <el-table v-loading="isLoading" :data="tableData" :show-header="false">
        <el-table-column prop="name" label="姓名" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img
                :src="scope.row.avatar"
                class="avatar"
                onerror="this.src='/src/assets/defaultAvatar.jpg'"
              />
              <div style="margin-left: 20px">{{ scope.row.name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleRemove(scope.row)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="addConsultantDialogVisible"
      title="添加咨询师"
      width="400px"
    >
      <form-add-schedule
        ref="addConsultantForm"
        :is-consultant="true"
        :options-data="optionsData"
        @on-submit="handleSubmit"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addConsultantDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submitAddForm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="addSupervisorDialogVisible"
      title="添加督导"
      width="400px"
    >
      <form-add-schedule
        ref="addSupervisorForm"
        :is-consultant="false"
        :options-data="optionsData"
        @on-submit="handleSubmit"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addSupervisorDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submitAddForm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import FormAddSchedule from "@/components/form-add-schedule.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  addArrangement,
  consultantArrangement,
  monthArrangement,
  notArrangedConsultants,
  notArrangedSupervisors,
  removeArrangement,
  supervisorArrangement
} from "@/apis/arrangement/arrangement";
import {
  ArrangementResp,
  MonthArrangementResp
} from "@/apis/arrangement/arrangement-interface";

let isLoading = ref(false);
let activeIndex = ref("1");

const handleSelect = (key: string) => {
  activeIndex.value = key;
};

const tableData: ArrangementResp[] = reactive([]);

const addConsultantDialogVisible = ref(false);
const addSupervisorDialogVisible = ref(false);
const optionsData = reactive<
  {
    id: string;
    name: string;
  }[]
>([]);

const handleAddConsultant = async () => {
  const data = await notArrangedConsultants({
    name: "",
    timestamp: currentDate.value.getTime()
  });
  optionsData.splice(0);
  data.forEach((i) =>
    optionsData.push({
      id: i.id,
      name: i.name
    })
  );
  addConsultantDialogVisible.value = true;
};
const handleAddSupervisor = async () => {
  const data = await notArrangedSupervisors({
    name: "",
    timestamp: currentDate.value.getTime()
  });
  optionsData.splice(0);
  data.forEach((i) =>
    optionsData.push({
      id: i.id,
      name: i.name
    })
  );
  addSupervisorDialogVisible.value = true;
};

const addConsultantForm: any = ref(null);
const addSupervisorForm: any = ref(null);
const submitAddForm = async () => {
  try {
    await addConsultantForm.value.submitForm();
  } catch (e) {
    return;
  }
};

const handleSubmit = async () => {
  await addArrangement({
    timestamp: currentDate.value.getTime()
  });
};
const handleRemove = async (row) => {
  await ElMessageBox.confirm("确定移除排班吗？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  });
  await removeArrangement({
    timestamp: currentDate.value.getTime(),
    userId: row.id
  });
  ElMessage({
    message: "移除成功",
    type: "success",
    duration: 5 * 1000
  });
};

let currentDate = ref(new Date());
let currentYear = ref(new Date().getFullYear());
let currentMonth = ref(new Date().getMonth() + 1);
let monthData: MonthArrangementResp[] = reactive([]);
const refreshData = async () => {
  monthData.splice(0);
  const data = await monthArrangement({
    year: currentYear.value,
    month: currentMonth.value
  });
  data.forEach((i) => monthData.push(i));
};

const refreshTableData = async () => {
  isLoading.value = true;
  tableData.splice(0);
  if (activeIndex.value == "1") {
    const data = await consultantArrangement({
      timestamp: currentDate.value.getTime()
    });
    data.forEach((i) => tableData.push(i));
  } else {
    const data = await supervisorArrangement({
      timestamp: currentDate.value.getTime()
    });
    data.forEach((i) => tableData.push(i));
  }
  isLoading.value = false;
};
watch(() => currentYear.value, refreshData);
watch(() => currentMonth.value, refreshData);
watchEffect(async () => {
  await refreshTableData();
});
const calendar = ref();
const selectDate = (val: string) => {
  if (val === "prev-month") {
    currentMonth.value--;
    if (currentMonth.value < 0) {
      currentYear.value--;
      currentMonth.value = 12;
    }
  } else if (val === "next-month") {
    currentMonth.value++;
    if (currentMonth.value > 12) {
      currentYear.value++;
      currentMonth.value = 1;
    }
  } else {
    currentMonth.value = new Date().getMonth() + 1;
  }
  calendar.value.selectDate(val);
};

onMounted(async () => {
  await refreshData();
});
</script>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  height: 30px;
}
.calendar-date {
  color: white;
  background-color: #89c9ff;
  padding: 5px;
  position: absolute;
  top: -8px;
  left: -8px;
}
</style>
<style lang="scss">
.el-calendar-table .el-calendar-day:hover {
  .calendar-date {
    background-color: #40a8ff;
  }
}
</style>
