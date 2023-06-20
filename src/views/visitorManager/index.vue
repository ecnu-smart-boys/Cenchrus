<template>
  <div>
    <div style="display: flex">
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
    </div>
    <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" width="200">
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
      <el-table-column prop="gender" label="性别" width="100" />
      <el-table-column prop="age" label="年龄" width="150" />
      <el-table-column prop="phone" label="联系电话" width="250" />
      <el-table-column prop="emergencyName" label="紧急联系人" width="250" />
      <el-table-column
        prop="emergencyPhone"
        label="紧急联系人电话"
        width="200"
      />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
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
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch } from "vue";
import { ElMessageBox } from "element-plus";
import { getVisitors } from "@/apis/userArrange/visitor/visitor";
import { disable, enable } from "@/apis/userArrange/user";

let isLoading = ref(false);
let searchName = ref("");

interface FormVisitor {
  id: string;
  name: string;
  avatar: string;
  gender: string;
  username: string;
  phone: string;
  age: number;
  emergencyName: string;
  emergencyPhone: string;
  time: string;
  state: string;
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

const tableData: FormVisitor[] = reactive([]);

const handleDisable = async (row) => {
  await ElMessageBox.confirm(
    `确定${row.state == "正常" ? "禁用" : "启用"}该访客吗？`,
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
  isLoading.value = true;
  const data = await getVisitors({
    current: currentPage.value,
    name: searchName.value,
    size: pageSize.value
  });
  totalPage.value = data.total;
  tableData.splice(0);
  data.visitorInfos.forEach((c) => {
    const i = {
      id: c.id,
      name: c.name,
      avatar: c.avatar,
      gender: c.gender == 1 ? "男" : "女",
      phone: c.phone,
      username: c.username,
      emergencyName: c.emergencyContact,
      emergencyPhone: c.emergencyPhone,
      time: "",
      age: c.age,
      state: c.disabled ? "禁用" : "正常"
    };
    tableData.push(i);
  });
  isLoading.value = false;
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
