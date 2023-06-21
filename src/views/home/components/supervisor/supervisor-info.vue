<template>
  <el-card class="box-card" body-style="padding: 0;">
    <div class="card-wrapper">
      <img
        :src="store.userInfo.avatar"
        alt=""
        onerror="this.src='/defaultAvatar.jpg'"
      />
      <div class="middle-wrapper">
        <div class="name-wrapper">
          <div class="name">{{ store.userInfo.name }}</div>
          <el-button type="primary" @click="handleClick">咨询设置</el-button>
        </div>
      </div>
    </div>
  </el-card>
  <el-dialog
    v-model="settingDialogVisible"
    title="修改最大咨询数"
    width="400px"
  >
    <form-setting
      ref="settingForm"
      :is-consultant="false"
      :current-count="currentCount"
      @on-submit="handleSubmit"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel"> 取消 </el-button>
        <el-button type="primary" @click="submitAddForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import FormSetting from "@/components/form-setting.vue";
import { setting } from "@/apis/conversation/conversation";
import { ElMessage } from "element-plus";
import { nextTick, ref, watchEffect } from "vue";
import createStore from "@/store";
const store = createStore();

const props = defineProps<{
  currentCount: number;
}>();

const settingForm: any = ref(null);
let settingDialogVisible = ref(false);

const currentCountData = ref(0);

watchEffect(() => {
  currentCountData.value = props.currentCount;
});

const emits = defineEmits<{
  (event: "onChange"): void;
}>();

const handleClick = () => {
  currentCountData.value = props.currentCount;
  settingDialogVisible.value = true;
  nextTick(() => {
    settingForm.value.resetMaxCount(props.currentCount);
  });
};
const handleSubmit = async (data) => {
  await setting({
    maxConversations: parseInt(data.maxCount)
  });
  ElMessage({
    message: "修改成功",
    type: "success",
    duration: 5 * 1000
  });
  handleCancel();
};

const handleCancel = () => {
  settingDialogVisible.value = false;
  emits("onChange");
};
const submitAddForm = async () => {
  try {
    await settingForm.value.submitForm();
  } catch (e) {
    return;
  }
};
</script>

<style scoped lang="scss">
.box-card {
  height: 220px;
  min-width: 326px;
  margin: 0 10px 20px 0;

  .card-wrapper {
    display: flex;
    align-items: center;

    img {
      height: 180px;
      border-radius: 50%;
      margin: 20px;
    }

    .middle-wrapper {
      width: 100%;
      margin-right: 20px;

      .name-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        .name {
          font-size: 1.5em;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
