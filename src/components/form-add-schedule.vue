<template>
  <el-form
    ref="ruleFormRef"
    :rules="rules"
    :model="form"
    label-width="120px"
    label-position="top"
    status-icon
  >
    <div style="margin-left: 40px">
      <el-form-item
        :label="props.isConsultant ? '搜索咨询师' : '搜索督导'"
        prop="name"
      >
        <el-autocomplete
          v-model="form.value"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          placeholder="输入姓名进行搜索"
          :prefix-icon="Search"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { defineEmits, reactive, ref, watchEffect } from "vue";
import type { FormInstance } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { FormRules } from "element-plus";

const props = defineProps<{
  optionsData: {
    id: string;
    name: string;
  }[];
  isConsultant: boolean;
}>();

const emits = defineEmits<{
  (
    event: "onSubmit",
    form: {
      name: string;
    }
  ): void;
}>();

const form = reactive({
  value: ""
});

const ruleFormRef: any = ref<FormInstance>();

const rules = reactive<FormRules>({
  value: [
    {
      required: true,
      message: props.isConsultant ? "请选择咨询师" : "请选择督导",
      trigger: "blur"
    }
  ]
});
const submitForm = async () => {
  await ruleFormRef.value.validate((valid) => {
    if (!valid) {
      throw Error();
    }
  });
  console.log(form);
  emits("onSubmit", form);
};

const employeeList = ref([]);
watchEffect(() => {
  employeeList.value.splice(0);
  props.optionsData.forEach((i) =>
    employeeList.value.push({
      id: i.id,
      name: i.name,
      value: {
        id: i.id,
        toString: function () {
          return i.name;
        },
        valueOf: function () {
          return i.id;
        }
      }
    })
  );
});
const querySearch = (queryString: string, cb: any) => {
  let results = queryString
    ? employeeList.value.filter((item) => {
        return item.name.indexOf(queryString) >= 0;
      })
    : employeeList.value;
  cb(results);
};

defineExpose({ submitForm });
</script>

<style scoped lang="scss"></style>
