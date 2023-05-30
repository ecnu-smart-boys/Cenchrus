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
      <el-table-column fixed prop="name" label="姓名" width="150">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <img
              :src="scope.row.avatar"
              class="avatar"
              onerror="this.src='/src/assets/defaultAvatar.jpg'"
            />
            <div style="margin-left: 10px">{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="80" />
      <el-table-column prop="duration" label="总咨询时长" width="120" />
      <el-table-column prop="count" label="总咨询次数" width="120" />
      <el-table-column prop="supervisor" label="绑定督导" width="180" />
      <el-table-column prop="schedule" label="排班" width="280" />
      <el-table-column prop="rate" label="咨询评级" width="180">
        <template #default="scope">
          <el-rate v-model="scope.row.rate" size="large" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleSchedule(scope.row)"
            >排班</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDisable(scope.row)"
            >{{ scope.row.state == "正常" ? "禁用" : "启用" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      style="float: right; margin: 20px"
      background
      layout="prev, pager, next, jumper"
      :total="totalPage"
      @current-change="handleCurrentChange"
    />
  </div>
  <el-dialog v-model="addDialogVisible" title="添加咨询师" width="700px">
    <form-add-employee
      ref="addConsultantForm"
      :is-consultant="true"
      @on-submit="handleAddSubmit"
    />
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
import { onMounted, reactive, ref, watch } from "vue";
import FormAddEmployee from "@/components/form-add-employee.vue";
import FormEditEmployee from "@/components/form-edit-employee.vue";
import FormSchedule from "@/components/form-schedule.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  addConsultant,
  getConsultants
} from "@/apis/userArrange/consultant/consultant";
import { md5, parseSchedule, parseTime, toBoolArraySchedule } from "@/utils";
import { AddFormData } from "@/components/schema";
import { disable, enable, updateArrangement } from "@/apis/userArrange/user";

let searchName = ref("");

interface FormConsultant {
  id: string;
  name: string;
  avatar: string;
  gender: string;
  count: number;
  duration: string;
  supervisor: string;
  _schedule: number;
  schedule: string;
  state: string;
  rate: number;
}

watch(
  () => searchName.value,
  async () => {
    currentPage.value = 1;
    await refreshData();
  }
);

let currentPage = ref(1);
let pageSize = ref(10);
let totalPage = ref(10);
const handleCurrentChange = async (val) => {
  currentPage.value = val;
  await refreshData();
};

const addDialogVisible = ref(false);
const editDialogVisible = ref(false);
const scheduleDialogVisible = ref(false);

let tableData: FormConsultant[] = reactive([]);

const addConsultantForm: any = ref(null);
const editConsultantForm: any = ref(null);
const scheduleConsultantForm: any = ref(null);

const submitAddForm = async () => {
  try {
    await addConsultantForm.value.submitForm();
  } catch (e) {
    return;
  }
};

const handleAddSubmit = async (data: AddFormData) => {
  await addConsultant({
    age: Number(data.age),
    department: data.workPlace,
    email: data.email,
    gender: data.gender == "男" ? 1 : 2,
    idNumber: data.idNumber,
    name: data.name,
    password: md5(data.password),
    phone: data.phone,
    supervisorIds: [],
    title: data.title,
    username: data.username
  });
  addDialogVisible.value = false;
  addConsultantForm.value.changeToDefault();
  ElMessage({
    message: "添加成功",
    type: "success",
    duration: 5 * 1000
  });
  await refreshData();
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
const handleEdit = (row) => {
  // TODO get infomation api
  // just get like this
  editData = row;
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

let scheduleData = reactive<{
  schedule: any[];
  id: string;
}>({
  schedule: [],
  id: ""
});
const handleSchedule = (row) => {
  scheduleData = {
    schedule: toBoolArraySchedule(row._schedule),
    id: row.id
  };
  scheduleDialogVisible.value = true;
};

const submitScheduleForm = async () => {
  await updateArrangement({
    id: scheduleData.id,
    arrangement: scheduleConsultantForm.value.getScheduleData()
  });
  ElMessage({
    message: "修改成功",
    type: "success",
    duration: 5 * 1000
  });
  scheduleDialogVisible.value = false;
  await refreshData();
};

const handleDisable = async (row) => {
  await ElMessageBox.confirm(
    `确定${row.state == "正常" ? "禁用" : "启用"}该咨询师吗？`,
    "警告",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  );
  if (row.state == "正常") {
    await disable({
      id: row.id
    });
  } else {
    await enable({
      id: row.id
    });
  }
  await refreshData();
};

const refreshData = async () => {
  const data = await getConsultants({
    current: currentPage.value,
    name: searchName.value,
    size: pageSize.value
  });
  totalPage.value = data.total;
  tableData.splice(0);
  data.consultants.forEach((c) => {
    const i = {
      id: c.id,
      name: c.name,
      avatar: c.avatar,
      gender: c.gender == 1 ? "男" : "女",
      count: c.consultTimes,
      duration: parseTime(c.totalTime),
      supervisor: c.supervisorList.map((i) => i.name).join(", "),
      schedule: parseSchedule(c.arrangement),
      _schedule: c.arrangement,
      state: c.disabled ? "禁用" : "正常",
      rate: c.avgComment
    };
    tableData.push(i);
  });
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
</style>
