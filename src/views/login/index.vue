<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="/icon.png" alt="" />
      </div>
      <div style="height: 60px; width: 100%"></div>
      <el-form
        ref="loginForm"
        label-width="80px"
        class="login-form"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <div class="login-captcha">
          <el-form-item prop="captcha" label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
          <img
            :src="captchaUrl"
            style="width: 120px; height: 40px"
            alt=""
            @click="refreshCaptcha"
          />
        </div>
        <div class="login-button">
          <el-button type="primary" @click="loginSubmit">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { captcha } from "@/apis/captcha/captcha";
import { login } from "@/apis/auth/auth";
import { md5 } from "@/utils";
import useStore from "@/store";
import router from "@/router";
import { ElMessage } from "element-plus";
import { imLogin } from "@/apis/im/im";
import { genTestUserSig } from "@/debug";
const store = useStore();

let captchaId;
let captchaUrl = ref("");
const form = reactive({
  username: "",
  password: "",
  captcha: ""
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      validator: (rule, value) => /^[a-zA-Z_]{1,32}$/.test(value),
      message: "请输入合法用户名",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度为6-32个字符", trigger: "blur" }
  ],
  captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});
const loginForm: any = ref(null);
const loginSubmit = async () => {
  await loginForm.value.validate((valid) => {
    if (!valid) {
      throw Error();
    }
  });
  try {
    const data = await login({
      username: form.username,
      password: md5(form.password),
      captchaId,
      captcha: form.captcha
    });
    await imLogin({
      userID: data.id,
      userSig: genTestUserSig({
        SDKAppID: 1400810468,
        secretKey:
          "d14df58bc7f5f87424981ca2165867287e2c4ad3ba021709bfdd50edf37daaa0",
        userID: data.id
      }).userSig
    });
    store.setIsLogin();
    store.setUserInfo(data);
    ElMessage({
      message: "登录成功",
      type: "success",
      duration: 5 * 1000
    });
    await router.push({ path: "/" });
  } catch (e) {
    await refreshCaptcha();
  }
};
const reset = async () => {
  loginForm.value.resetFields();
  await refreshCaptcha();
};

const refreshCaptcha = async () => {
  const data = await captcha();
  captchaId = data.captchaId;
  captchaUrl.value = data.entity;
};
onMounted(async () => {
  await refreshCaptcha();
});
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to left top, #0aa946, #0e3e80);

  .login-box {
    width: 500px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.8);
    position: relative;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px #484848;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar-box {
      height: 100px;
      width: 100px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 10px #6e6e6e;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 10px;
      top: 0;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .login-form {
      .el-form-item {
        padding: 5px 0;
      }
      .login-captcha {
        display: flex;
        justify-content: space-between;
      }

      .login-button {
        display: flex;
        justify-content: center;

        .el-button {
          margin: 10px 20px;
        }
      }
    }
  }
}
</style>
