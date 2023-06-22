<template>
  <div class="layout-wrapper">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleUpperSelect"
        >
          <img
            :src="store.userInfo.avatar"
            class="avatar"
            alt=""
            onerror="this.src = '/defaultAvatar.jpg'"
            @click="handleChange"
          />
          <el-menu-item index="0">心晴帮帮-心理热线咨询平台</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">登出</el-menu-item>
        </el-menu></el-header
      >
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeIndexUnder" @select="handleSelect">
            <el-menu-item index="/">
              <el-icon><location /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="consult-record">
              <el-icon><icon-menu /></el-icon>
              <span>咨询记录</span>
            </el-menu-item>
            <el-menu-item v-if="store.role == 'supervisor'" index="help-record">
              <el-icon><icon-menu /></el-icon>
              <span>求助记录</span>
            </el-menu-item>
            <el-menu-item v-if="store.role == 'admin'" index="schedule">
              <el-icon><icon-menu /></el-icon>
              <span>排班表</span>
            </el-menu-item>
            <el-menu-item
              v-if="store.role == 'admin'"
              index="consultant-manager"
            >
              <el-icon><icon-menu /></el-icon>
              <span>咨询师管理</span>
            </el-menu-item>
            <el-menu-item
              v-if="store.role == 'admin'"
              index="supervisor-manager"
            >
              <el-icon><icon-menu /></el-icon>
              <span>督导管理</span>
            </el-menu-item>
            <el-menu-item v-if="store.role == 'admin'" index="visitor-manager">
              <el-icon><icon-menu /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
          </el-menu>
          <conversation-list
            v-if="store.role == 'supervisor' || store.role == 'consultant'"
          />
        </el-aside>
        <el-main body-style="padding: 0;">
          <router-view :key="`${route.path}${route.query?.userId}`" />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog v-model="changeDialogVisible" title="修改个人信息" width="400px">
    <el-form
      ref="dialogForm"
      label-width="120px"
      label-position="top"
      status-icon
      :model="form"
      :rules="rules"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="重复新密码" prop="repeatPassword">
        <el-input v-model="form.repeatPassword" type="password" show-password />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="`${baseUrl}/user/saveAvatar`"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeDialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location, Plus } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import router, { hasRoles } from "@/router";
import createStore from "@/store/index";
import { logout } from "@/apis/auth/auth";
import { imLogout } from "@/apis/im/im";
import ConversationList from "@/views/conversation/components/conversation-list.vue";
import { useRoute } from "vue-router";
import type { UploadProps } from "element-plus";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { md5 } from "@/utils";
import { updatePsdAndAvatar } from "@/apis/userArrange/user";

const route = useRoute();
const store = createStore();
const changeDialogVisible = ref(false);
const dialogForm: any = ref<FormInstance>();

const baseUrl = process.env.VUE_APP_API_BASE_URL;
const headers: Record<string, any> = {
  "x-freud": store.token
};

const form = reactive({
  oldPassword: "",
  password: "",
  repeatPassword: ""
});

const imageUrl = ref("/defaultAvatar.jpg");

const handleAvatarSuccess: UploadProps["onSuccess"] = (response, _, __) => {
  imageUrl.value = response.message;
};

const rules = reactive<FormRules>({
  oldPassword: [
    { required: true, message: "请输入旧密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度为6-32个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度为6-32个字符", trigger: "blur" }
  ],
  repeatPassword: [
    { required: true, message: "请重复输入新密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度为6-32个字符", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      }
    }
  ]
});

const submitForm = async () => {
  await dialogForm.value.validate((valid) => {
    if (!valid) {
      throw Error();
    }
  });
  try {
    await updatePsdAndAvatar({
      oldPsd: md5(form.oldPassword),
      newPsd: md5(form.password),
      avatar: imageUrl.value
    });
    await handleUpperSelect("1");
  } catch (e) {
    ElMessage.error("修改失败");
  }
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("头像格式错误");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小不能超过2MB");
    return false;
  }
  return true;
};

const handleSelect = (key: string) => {
  router.push(key);
};
const handleUpperSelect = async (key: string) => {
  if (key == "1") {
    try {
      await logout();
      await imLogout();
    } catch (e) {
      console.log(e);
    }
    store.clearUserInfo();
    store.clearToken();
    if (router.hasRoute("supervisor")) {
      router.removeRoute("supervisor");
    }
    if (router.hasRoute("admin")) {
      router.removeRoute("admin");
    }
    if (router.hasRoute("consultant")) {
      router.removeRoute("consultant");
    }
    hasRoles.hasRoles = true;
    await router.push({ path: "/login" });
  }
};

const activeIndex = ref("1");

const activeIndexUnder = ref("");
onMounted(() => {
  const reg = /#\/([\w-]*)\??.*/;
  reg.test(location.hash);
  if (
    RegExp.$1 == "consultant" ||
    RegExp.$1 == "administrator" ||
    RegExp.$1 == "supervisor"
  ) {
    activeIndexUnder.value = "/";
  } else {
    activeIndexUnder.value = RegExp.$1;
  }
});

const handleChange = async () => {
  imageUrl.value = store.userInfo.avatar;
  form.oldPassword = "";
  form.password = "";
  form.repeatPassword = "";
  changeDialogVisible.value = true;
};
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}
.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 10px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  text-align: center;
}
</style>
