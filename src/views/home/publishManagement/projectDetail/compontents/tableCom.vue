<script setup>
  import { ref } from 'vue'
  console.log(12)
  // debugger
  const props = defineProps({
    // tableHead: {
    //   type: Array,
    //   default: () => []
    // },
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

    <!-- <el-table-column align="center" label="操作按钮">
      <template #default="scope">
        {{scope.row}}
        <el-button type="info">查看日志详情</el-button>
      </template>
    </el-table-column> -->


     <!-- 展开内容 -->
    <el-table-column type="expand" label="展开查看日志" width="120">
      <template #default="props">
        <h4>日志如下：</h4>
        <p v-html="props.row.logs" style="white-space:pre-wrap"></p>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scope>

</style>