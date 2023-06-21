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
          <div style="display: flex; align-items: center">
            <div class="name">{{ store.userInfo.name }}</div>
            <div class="dot"></div>
            <div style="color: #409dfd">在线</div>
          </div>
          <el-tag :type="tagType">{{
            currentCount > todayConsultantSession ? "空闲" : "忙碌"
          }}</el-tag>
        </div>
        <div style="margin: 20px 0">
          <div style="font-size: 1.2em">我的综合评价</div>
          <el-rate
            v-model="value"
            size="large"
            disabled
            style="transform: scale(1.8) translateX(25px)"
          />
        </div>
        <el-button type="primary" @click="handleClick">咨询设置</el-button>
      </div>
      <div class="right-wrapper">
        <div style="font-size: 1.5em; margin: 10px">累计完成咨询</div>
        <div style="font-size: 3em">
          {{ totalConsultations ? totalConsultations : 0 }}
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
      :current-count="currentCountData"
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
import { computed, nextTick, ref, watchEffect } from "vue";
import FormSetting from "@/components/form-setting.vue";
import { ElMessage } from "element-plus";
import { setting } from "@/apis/conversation/conversation";
import createStore from "@/store";
const store = createStore();

const props = defineProps<{
  totalConsultations: number | undefined;
  currentCount: number;
  todayConsultantSession: number;
  avgComment: number;
}>();
const value = ref(0);
const settingForm: any = ref(null);
let settingDialogVisible = ref(false);

const currentCountData = ref(0);

watchEffect(() => {
  value.value = props.avgComment;
});
watchEffect(() => {
  currentCountData.value = props.currentCount;
});
const handleClick = () => {
  currentCountData.value = props.currentCount;
  settingDialogVisible.value = true;
  nextTick(() => {
    settingForm.value.resetMaxCount(props.currentCount);
  });
};

const emits = defineEmits<{
  (event: "onChange"): void;
}>();

let tagType = computed(() => {
  if (props.currentCount > props.todayConsultantSession) {
    return "";
  }
  return "danger";
});

const handleCancel = () => {
  settingDialogVisible.value = false;
  emits("onChange");
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
  min-width: 500px;
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
      margin: 20px;

      .name-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        .dot {
          border-radius: 50%;
          background-color: #409dfd;
          width: 8px;
          height: 8px;
          margin: 5px;
        }

        .name {
          font-size: 1.5em;
          margin-right: 10px;
        }
      }
    }

    .right-wrapper {
      display: flex;
      height: 220px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #409dfd;
      color: white;
      width: 700px;
    }
  }
}
</style>
