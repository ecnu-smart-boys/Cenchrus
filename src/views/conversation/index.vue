<template>
  <to-visitor v-if="role === 'consultant'" />
  <to-consultant v-if="role === 'supervisor'" />
</template>

<script setup lang="ts">
import ToVisitor from "@/views/conversation/components/consultant/to-visitor.vue";
import ToConsultant from "@/views/conversation/components/supervisor/to-consultant.vue";
import createStore from "@/store/index";
const { role } = createStore();
</script>

<style scoped lang="scss"></style>
