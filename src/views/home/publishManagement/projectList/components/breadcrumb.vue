<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
const props = defineProps({
  breadcrumbList: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in props.breadcrumbList" :key="item.value">{{item.value}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style>

</style>