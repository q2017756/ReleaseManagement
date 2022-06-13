<script setup>
import { reactive, onMounted, ref } from 'vue'
import breadcrumb from './components/breadcrumb.vue'
import tableCom from './components/tableCom.vue'

import { requestByGetProjectList } from '@/apis/projectManagement.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({
  name: '',
  status: 'USE', // 使用、弃用
})

let tableData = ref([])

// 获取项目列表
const getProjectList = async params => {
  try {
    const {
      status,
      data: { message, result: res },
    } = await requestByGetProjectList(params)
    if (status === 200) {
      console.log('res: ', res);
      tableData.value = res
    } else {
      ElMessage({
        type: 'error',
        message: message,
        showClose: true,
        center: true,
        grouping: true,
      })
    }
  } catch (e) {
    ElMessage({
      type: 'error',
      message: e.message || '请求失败',
      showClose: true,
      center: true,
      grouping: true,
    })
  }
}

// 过滤查询
const onSearch = () => {
  getProjectList(form)
}
onSearch() // 以前需要在mounted里写，现在直接调用一下，就初始化列表了

const add = () => {
  router.push({ name: 'projectDetail', params: { project: 'addNewProject' } })
}
</script>

<template>
  <div class="projectList">
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb" />
    <!-- search -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-input
          @input="onSearch"
          v-model="form.name"
          placeholder="请输入项目名称"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-select
          @change="onSearch"
          v-model="form.status"
          placeholder="状态：使用/弃用"
          clearable
        >
          <el-option label="使用" value="USE" />
          <el-option label="弃用" value="UNUSE" />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 新增 -->
    <div class="button">
      <el-button size="small" type="info" @click="add">新增</el-button>
    </div>
    <!-- table -->
    <table-com @unuse="onSearch" :table-data="tableData" class="table" />
  </div>
</template>

<style lang="scss" scope>
.projectList {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 20px;
  .breadcrumb {
    height: 36px;
    line-height: 36px;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .table {
    flex: 1;
    margin-bottom: 20px;
  }
}
</style>
