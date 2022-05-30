<script setup>
import { requestByUnuse } from '@/apis/projectManagement.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['unuse'])

// 详情跳转
const jumpDetail = row => {
  router.push({
    name: 'projectDetail',
    params: { project: row.name },
    query: { id: row.id, flag: 'detail' },
  })
}

// 弃用
const unUse = async id => {
  try {
    const {
      status,
      data: { message, result: res },
    } = await requestByUnuse(id)
    if (status === 200) {
      ElMessage({
        type: 'success',
        message: '废弃成功',
      })
      emit('unuse')
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

const unuseHandler = row => {
  ElMessageBox.confirm(`确定要废弃${row.name}吗`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      unUse(row.id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '废弃失败',
      })
    })
}
</script>

<template>
  <el-table height="100%" :data="props.tableData" border style="width: 100%">
    <el-table-column show-overflow-tooltip align="center" label="项目名称">
      <template #default="scope">
        <router-link
          class="myLink"
          :to="{ name: 'projectDetail', params: { project: scope.row.name }, query: { id: scope.row.id, flag: 'edit' }, }"
          >{{ scope.row.name }}</router-link
        >
      </template>
    </el-table-column>

    <el-table-column
      show-overflow-tooltip
      align="center"
      label="文件夹名"
      prop="gitProjectName"
    />
    
    <el-table-column
      show-overflow-tooltip
      align="center"
      label="所属git库"
      prop="gitRepository"
    />

    <el-table-column
      show-overflow-tooltip
      align="center"
      label="项目简介"
      prop="desc"
    />
    <el-table-column
      show-overflow-tooltip
      align="center"
      label="node版本"
      prop="nodeEnv"
    />

    <el-table-column label="操作按钮" show-overflow-tooltip align="center">
      <template #default="scope">
        <el-button size="small" type="info" @click="jumpDetail(scope.row)">
          查看详情
        </el-button>
        <el-button
          v-if="scope.row.status === 'USE'"
          size="small"
          type="info"
          @click="unuseHandler(scope.row)"
        >
          废弃
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scope>
.el-table {
  z-index: 0;
}
.myLink:hover {
  text-decoration: underline;
  color: $color;
}
</style>
