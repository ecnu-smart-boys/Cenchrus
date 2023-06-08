<template>
  <el-form
    ref="ruleSettingFormRef"
    label-width="120px"
    label-position="top"
    :model="form"
    status-icon
    :rules="rules"
  >
    <div style="display: flex; justify-content: center">
      <el-form-item label="最大咨询数" prop="maxCount">
        <el-input v-model="form.maxCount" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { defineEmits, reactive, ref, watchEffect } from "vue";
import { FormRules } from "element-plus";
const props = defineProps<{
  currentCount: number;
}>();

const ruleSettingFormRef: any = ref(null);

const emits = defineEmits<{
  (event: "onSubmit", formData: any): void;
}>();

const form = reactive({
  maxCount: ""
});

watchEffect(() => {
  form.maxCount = String(props.currentCount);
});

const rules = reactive<FormRules>({
  maxCount: [
    { required: true, message: "请输入最大咨询数", trigger: "blur" },
    {
      validator: (rule, value) => /^([1-9]|10)$/.test(value),
      message: "请输入合法最大咨询数",
      trigger: "blur"
    }
  ]
});

const submitForm = async () => {
  await ruleSettingFormRef.value.validate((valid) => {
    if (!valid) {
      throw Error();
    }
  });
  emits("onSubmit", form);
};
defineExpose({ submitForm });
</script>

<style scoped lang="scss"></style>
