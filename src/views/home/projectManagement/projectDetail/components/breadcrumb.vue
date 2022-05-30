<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  breadcrumbList: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      :to="item === '项目管理' ? { name: 'projectList' } : null"
      v-for="item in props.breadcrumbList"
      :key="item"
      >{{ item }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<style></style>
