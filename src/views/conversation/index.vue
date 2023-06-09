<template>
  <to-visitor />
  <!--  <to-consultant />-->
</template>

<script setup lang="ts">
import ToVisitor from "@/views/conversation/components/consultant/to-visitor.vue";
import ToConsultant from "@/views/conversation/components/supervisor/to-consultant.vue";
import createStore from "@/store/index";
const { role } = createStore();
</script>

<style scoped lang="scss"></style>
