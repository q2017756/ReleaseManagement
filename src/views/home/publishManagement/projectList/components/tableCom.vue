<script setup>
  const props = defineProps({
    tableData: {
      type: Array,
      default: () => []
    },
    // tableHead: {
    //   type: Array,
    //   default: () => []
    // }
  });
  const handlePublishPackage = (index, row) => {
    console.log('index: ', index);
    console.log('row: ', row);
  }
</script>

<template>
  <el-table :data="props.tableData" border style="width: 100%">
    <el-table-column show-overflow-tooltip align="center" label="项目名称">
      <template #default="scope">
        <router-link class="myLink" :to="{ name: 'publishDetail', params: { project:  scope.row.id}}">{{scope.row.name}}</router-link>
      </template>
    </el-table-column>

    <el-table-column
      show-overflow-tooltip
      align="center"
      label="项目简介"
      prop="desc"
    />

    <el-table-column label="操作按钮" show-overflow-tooltip align="center">
      <template #default="scope">
        <el-button
          size="small"
          type="info"
          @click="handlePublishPackage(scope.$index, scope.row)"
          >打包test</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scope>
  .el-table--fit, .el-table__inner-wrapper, .el-table__body-wrapper {
    height: 100%;
    max-height: 100%;
  }
  .myLink:hover {
    text-decoration:underline;
    color: $color;
  }
</style>