<template>
  <div>
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 20px;
        "
      >
        <div style="margin-bottom: 10px">搜索姓名</div>
        <el-input
          v-model="searchName"
          placeholder="输入姓名进行搜索"
          :prefix-icon="Search"
        />
      </div>
      <el-button type="primary" @click="addDialogVisible = true"
        >添加咨询师</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <img
              src="https://img1.baidu.com/it/u=4259218938,3459520686&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              class="avatar"
            />
            <div style="margin-left: 10px">{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="80" />
      <el-table-column prop="duration" label="总咨询时长" width="120" />
      <el-table-column prop="count" label="总咨询次数" width="120" />
      <el-table-column prop="supervisor" label="绑定督导" width="180" />
      <el-table-column prop="schedule" label="排班" width="180" />
      <el-table-column prop="rate" label="咨询评级" width="180">
        <template #default="scope">
          <el-rate v-model="scope.row.rate" size="large" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default>
          <el-button link type="primary" size="small" @click="handleEdit"
            >修改</el-button
          >
          <el-button link type="primary" size="small" @click="handleSchedule"
            >排班</el-button
          >
          <el-button link type="primary" size="small" @click="handleDisable"
            >禁用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="pageSize3"
      style="float: right; margin: 20px"
      background
      layout="prev, pager, next, jumper"
      :total="20"
      @current-change="handleCurrentChange"
    />
  </div>
  <el-dialog v-model="addDialogVisible" title="添加咨询师" width="700px">
    <form-add-employee ref="addConsultantForm" :is-consultant="true" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitAddForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="editDialogVisible" title="修改咨询师" width="700px">
    <form-edit-employee
      ref="editConsultantForm"
      :edit-data="editData"
      :is-consultant="true"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitEditForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="scheduleDialogVisible" title="修改排班" width="700px">
    <form-schedule ref="scheduleConsultantForm" :schedule-data="scheduleData" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="scheduleDialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitScheduleForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { reactive, ref, watch } from "vue";
import FormAddEmployee from "@/components/form-add-employee.vue";
import FormEditEmployee from "@/components/form-edit-employee.vue";
import FormSchedule from "@/components/form-schedule.vue";
import { ElMessageBox } from "element-plus";

let searchName = ref("");

watch(
  () => searchName.value,
  (oldName, newName) => {
    // TODO SEARCH API
  }
);

const addDialogVisible = ref(false);
const editDialogVisible = ref(false);
const scheduleDialogVisible = ref(false);

const tableData = [
  {
    name: "Tom",
    gender: "男",
    count: 100,
    duration: "00:12:39",
    supervisor: "111,222,333",
    schedule: "111,222,333",
    state: "正常",
    rate: 3
  }
];

const addConsultantForm: any = ref(null);
const editConsultantForm: any = ref(null);
const scheduleConsultantForm: any = ref(null);

const submitAddForm = async () => {
  try {
    await addConsultantForm.value.submitForm();
  } catch (e) {
    return;
  }
  // TODO submit api
  addDialogVisible.value = false;
  addConsultantForm.value.changeToDefault();
};

let editData = reactive({
  name: "",
  gender: "",
  age: 0,
  idNumber: "",
  supervisor: [],
  workPlace: "",
  title: ""
});
const handleEdit = async () => {
  // TODO get infomation api
  // just get like this
  editData = await {
    name: "111",
    gender: "男",
    age: 111,
    idNumber: "111",
    supervisor: [],
    workPlace: "111",
    title: "111"
  };
  editDialogVisible.value = true;
};

const submitEditForm = async () => {
  try {
    await editConsultantForm.value.submitForm();
  } catch (e) {
    return;
  }
  // TODO API
  editDialogVisible.value = false;
};

let scheduleData = reactive({
  schedule: [false, false, false, false, false, false, false]
});
const handleSchedule = async () => {
  scheduleData = await {
    schedule: [false, true, false, false, true, true, false]
  };
  scheduleDialogVisible.value = true;
};

const submitScheduleForm = async () => {
  // TODO API
};

const handleDisable = () => {
  ElMessageBox.confirm("确定禁用该咨询师吗？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      // TODO DISABLE API
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  height: 30px;
}
</style>
