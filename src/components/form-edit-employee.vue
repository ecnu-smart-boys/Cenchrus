<template>
  <el-form
    ref="ruleFormRef"
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
    <el-row v-if="!props.isConsultant" :gutter="20">
      <el-col :span="12">
        <el-form-item label="督导资质" prop="workPlace">
          <el-select v-model="form.qualification" style="width: 100%">
            <el-option
              v-for="item in qualificationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import { reactive, ref, defineProps, watchEffect, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { FormData } from "@/components/schema";
import { availableSupervisors } from "@/apis/userArrange/user";

const qualificationOptions = [
  {
    value: "1级",
    label: "1级"
  },
  {
    value: "2级",
    label: "2级"
  },
  {
    value: "3级",
    label: "3级"
  }
];

const props = defineProps<{
  editData: FormData;
  isConsultant: boolean;
}>();

const emits = defineEmits<{
  (event: "onSubmit", formData: FormData): void;
}>();

const form = reactive<FormData>({
  id: "",
  name: "",
  gender: "",
  age: "",
  idNumber: "",
  supervisor: [],
  workPlace: "",
  title: "",
  qualification: "",
  qualificationNumber: ""
});

watchEffect(() => {
  form.id = props.editData.id;
  form.name = props.editData.name;
  form.gender = props.editData.gender;
  form.age = String(props.editData.age);
  form.idNumber = props.editData.idNumber;
  props.editData.supervisor && (form.supervisor = props.editData.supervisor);
  form.workPlace = props.editData.workPlace;
  form.title = props.editData.title;
  props.editData.qualification &&
    (form.qualification = props.editData.qualification);
  props.editData.qualificationNumber &&
    (form.qualificationNumber = props.editData.qualificationNumber);
});

const options: {
  value: string;
  label: string;
}[] = reactive([]);

const ruleFormRef: any = ref<FormInstance>();

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
      validator: (rule, value) => /^(?:[1-9]\d|100)$/.test(value),
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
  supervisor: [{ required: true, message: "请绑定督导", trigger: "change" }],
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
  await ruleFormRef.value.validate((valid) => {
    if (!valid) {
      throw Error();
    }
  });
  emits("onSubmit", form);
};

const getAvailableSupervisors = async () => {
  options.splice(0);
  const data = await availableSupervisors();
  data.forEach((i) => {
    options.push({
      value: i.id,
      label: i.name
    });
  });
};

defineExpose({ submitForm, getAvailableSupervisors });
</script>

<style scoped lang="scss"></style>
