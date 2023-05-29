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
          v-model="form.name"
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
import { onMounted, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { FormRules } from "element-plus";

const props = defineProps<{
  isConsultant: boolean;
}>();

const form = reactive({
  name: ""
});

const ruleFormRef: any = ref<FormInstance>();

const rules = reactive<FormRules>({
  name: [
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
};

const employeeList = ref([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? employeeList.value.filter(createFilter(queryString))
    : employeeList.value;
  cb(results);
};

const createFilter = (queryString: string) => {
  return (item) => {
    return item.value.startsWith(queryString);
  };
};
const loadAll = async () => {
  if (props.isConsultant) {
    return [{ value: "咨询师A" }, { value: "咨询师B" }, { value: "咨询师C" }];
  } else {
    return [{ value: "督导A" }, { value: "督导B" }, { value: "督导C" }];
  }
};

onMounted(async () => {
  employeeList.value = await loadAll();
});

defineExpose({ submitForm });
</script>

<style scoped lang="scss"></style>
