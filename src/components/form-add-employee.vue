<template>
  <el-menu
    :default-active="activeIndex"
    style="margin-bottom: 20px"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">个人信息</el-menu-item>
    <el-menu-item index="2">工作信息</el-menu-item>
  </el-menu>
  <el-form
    v-show="activeIndex == '1'"
    ref="ruleForm1Ref"
    :model="form"
    label-width="120px"
    label-position="top"
    :rules="rules"
    status-icon
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" maxlength="32" show-word-limit />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="身份证号码" prop="idNumber">
          <el-input v-model="form.idNumber" maxlength="18" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" maxlength="20" show-word-limit />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" maxlength="30" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item v-if="props.isConsultant" label="绑定督导" prop="supervisor">
      <el-select v-model="form.supervisor" style="width: 100%" multiple>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <el-form
    v-show="activeIndex == '2'"
    ref="ruleForm2Ref"
    :model="form"
    label-width="120px"
    label-position="top"
    :rules="rules"
    status-icon
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" maxlength="20" show-word-limit />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="工作单位" prop="workPlace">
          <el-input v-model="form.workPlace" maxlength="30" show-word-limit />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="职称" prop="title">
          <el-input v-model="form.title" maxlength="30" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="!props.isConsultant" :gutter="20">
      <el-col :span="12">
        <el-form-item label="督导资质" prop="workPlace">
          <el-input
            v-model="form.qualification"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="资质编号" prop="title">
          <el-input
            v-model="form.qualificationNumber"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const props = defineProps<{
  isConsultant: boolean;
}>();

let activeIndex = ref("1");

const handleSelect = (key: string) => {
  activeIndex.value = key;
};

const defaultFormData = {
  name: "",
  gender: "",
  age: "",
  idNumber: "",
  phone: "",
  email: "",
  supervisor: null,
  username: "",
  password: "",
  workPlace: "",
  title: "",
  qualification: "",
  qualificationNumber: ""
};
const form = reactive({
  ...defaultFormData
});
const options: {
  value: string;
  label: string;
}[] = [
  {
    value: "Option1",
    label: "Option1"
  }
];

const ruleForm1Ref: any = ref<FormInstance>();
const ruleForm2Ref: any = ref<FormInstance>();

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 32, message: "姓名长度为2-32个字符", trigger: "blur" },
    {
      validator: (rule, value) => /^((?![\\;!@#$%^&*()]).)*$/.test(value),
      message: "姓名不能包含特殊字符",
      trigger: "blur"
    }
  ],
  gender: [
    {
      required: true,
      message: "请选择性别",
      trigger: "change"
    }
  ],
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    {
      validator: (rule, value) =>
        /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(value),
      message: "请输入合法年龄",
      trigger: "blur"
    }
  ],
  idNumber: [
    { required: true, message: "请输入身份证号", trigger: "blur" },
    {
      validator: (rule, value) =>
        /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          value
        ),
      message: "请输入合法身份证号",
      trigger: "blur"
    }
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      validator: (rule, value) =>
        /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
          value
        ),
      message: "请输入合法手机号",
      trigger: "blur"
    }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      validator: (rule, value) =>
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(
          value
        ),
      message: "请输入合法邮箱",
      trigger: "blur"
    }
  ],
  supervisor: [{ required: true, message: "请绑定督导", trigger: "change" }],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      validator: (rule, value) => /^[a-zA-Z_]{3,10}$/.test(value),
      message: "请输入合法用户名",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度为6-32个字符", trigger: "blur" }
  ],
  workPlace: [{ required: true, message: "请输入工作单位", trigger: "blur" }],
  title: [{ required: true, message: "请输入职称", trigger: "blur" }],
  qualification: [
    { required: true, message: "请输入督导资质", trigger: "blur" }
  ],
  qualificationNumber: [
    { required: true, message: "请输入资质编号", trigger: "blur" }
  ]
});

const submitForm = async () => {
  await ruleForm1Ref.value.validate((valid) => {
    if (!valid) {
      throw Error();
    }
  });
  await ruleForm2Ref.value.validate((valid) => {
    if (!valid) {
      throw Error();
    }
  });
};

const changeToDefault = () => {
  form.name = defaultFormData.name;
  form.age = defaultFormData.age;
  form.gender = defaultFormData.gender;
  form.email = defaultFormData.email;
  form.phone = defaultFormData.phone;
  form.username = defaultFormData.username;
  form.password = defaultFormData.password;
  form.title = defaultFormData.title;
  form.workPlace = defaultFormData.workPlace;
  form.supervisor = defaultFormData.supervisor;
  form.idNumber = defaultFormData.idNumber;
  form.qualification = defaultFormData.qualification;
  form.qualificationNumber = defaultFormData.qualificationNumber;
};
defineExpose({ submitForm, changeToDefault });
</script>

<style scoped lang="scss"></style>
