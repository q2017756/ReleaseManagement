<script setup>
  import { reactive, ref } from 'vue'
  import { getPublishInfo } from '@/apis/publishManagement.js'
  // debugger
  const props = defineProps({
    tableData: {
      type: Array,
      default: () => []
    }
  })
  const resultObj = {
    SUCCESS: {
      value: '成功',
      color: 'green'
    },
    FAIL: {
      value: '失败',
      color: 'red'
    },
    DOING: {
      value: '部署中',
      color: 'blue'
    }
  }
  let dialogVisible = ref(false)
  let publishDetail = reactive({
    logs: '111'
  })
  let logs = ref('')
  const handleGetPublishDetail = async (id) => {
    try {
      const {
        status,
        data: { message, result: res },
      } = await getPublishInfo({
        id: id
      })
      if (status === 200) {
        logs.value = res.logs
        dialogVisible.value = true
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
</script>

<template>
  <el-table height="100%" :data="props.tableData" border  style="width: 100%">
    <el-table-column align="center" sortable  prop="createdAt" label="发布时间" />
    <el-table-column align="center"  label="发布结果">
      <template #default="scope">
        <span :style="{color: resultObj[scope.row.result].color }">
          {{resultObj[scope.row.result].value}}
        </span>
      </template>
    </el-table-column>
    <el-table-column align="center" sortable  prop="operator" label="操作人" />

    <el-table-column label="展开查看日志" width="120">
      <template #default="props">
        <el-button 
          link type="primary" size="small" 
          @click="handleGetPublishDetail(props.row.id)"
        >
          查看日志
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    title="日志详情"
    width="80%"
  >
    <div style="height: 50vh;overflow-y: scroll;">
      <p v-html="logs" style="white-space: pre-wrap;"></p>
    </div>
  </el-dialog>
</template>

<style lang="scss" scope>

</style>