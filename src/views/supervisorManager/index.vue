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
        >添加督导</el-button
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
      <el-table-column prop="gender" label="性别" width="100" />
      <el-table-column prop="duration" label="总咨询时长" width="150" />
      <el-table-column prop="count" label="总咨询次数" width="150" />
      <el-table-column prop="consultant" label="绑定咨询师" width="200" />
      <el-table-column prop="schedule" label="排班" width="200" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleSchedule(scope.$index, scope.row)"
            >排班</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDisable(scope.$index, scope.row)"
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
    <el-dialog v-model="addDialogVisible" title="添加督导" width="700px">
      <form-add-employee ref="addSupervisorForm" :is-consultant="false" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="submitAddForm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editDialogVisible" title="修改督导" width="700px">
      <form-edit-employee
        ref="editSupervisorForm"
        :edit-data="editData"
        :is-consultant="false"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="submitEditForm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="scheduleDialogVisible" title="修改排班" width="700px">
      <form-schedule
        ref="scheduleSupervisorForm"
        :schedule-data="scheduleData"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="scheduleDialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="submitScheduleForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import FormAddEmployee from "@/components/form-add-employee.vue";
import { reactive, ref, watch } from "vue";
import FormSchedule from "@/components/form-schedule.vue";
import FormEditEmployee from "@/components/form-edit-employee.vue";
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
    consultant: "111,222,333",
    schedule: "111,222,333",
    state: "正常"
  }
];

const addSupervisorForm: any = ref(null);
const editSupervisorForm: any = ref(null);
const scheduleSupervisorForm: any = ref(null);

const submitAddForm = async () => {
  try {
    await addSupervisorForm.value.submitForm();
  } catch (e) {
    return;
  }
  // TODO submit api
  addDialogVisible.value = false;
  addSupervisorForm.value.changeToDefault();
};

let editData = reactive({
  name: "",
  gender: "",
  age: 0,
  idNumber: "",
  supervisor: [],
  workPlace: "",
  title: "",
  qualification: "",
  qualificationNumber: ""
});

const handleEdit = async (index, row) => {
  // TODO get infomation api
  // just get like this
  editData = await {
    name: "111",
    gender: "男",
    age: 111,
    idNumber: "111",
    supervisor: [],
    workPlace: "111",
    title: "111",
    qualification: "ABC",
    qualificationNumber: "123456789"
  };
  editDialogVisible.value = true;
};

const submitEditForm = async () => {
  try {
    await editSupervisorForm.value.submitForm();
  } catch (e) {
    return;
  }
  // TODO API
  editDialogVisible.value = false;
};

let scheduleData = reactive({
  schedule: [false, false, false, false, false, false, false]
});
const handleSchedule = async (index, row) => {
  scheduleData = await {
    schedule: [false, true, false, false, true, true, false]
  };
  scheduleDialogVisible.value = true;
};

const submitScheduleForm = async () => {
  // TODO API
};

const handleDisable = (index, row) => {
  ElMessageBox.confirm("确定禁用该督导吗？", "警告", {
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
