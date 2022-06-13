<script setup>
import Breadcrumb from './components/breadcrumb.vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import {
  requestByDetail,
  requestByAdd,
  requestByEdit,
} from '@/apis/projectManagement.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
/**
 * flag
 * 用途：判断新增、修改、详情
 * 取值：boolean ， ture:代表是新增，false代表是修改
 */
const flag = ref('add')
if(route?.query?.flag === 'detail') {
  flag.value = 'detail'
} else if(route?.query?.flag === 'edit'){
  flag.value = 'edit'
}

const nodeEnum = ref(['11.11.0', '16.13.0'])

const breadcrumbList = ref(['项目管理', '项目详情'])

let form = ref({
  name: '',
  gitRepository: '',
  desc: '',
  people: '',
  status: '',
  gitProjectName: '',
  nodeEnv: '',
  buildSrc: 'dist',
  buildFolder: '',
  buildHtml: ''
})
const rules = reactive({
  name: [{ required: true, message: 'name为必填项', trigger: 'blur' }],
  buildSrc: [
    { required: true, message: 'buildSrc为必填项', trigger: 'blur' },
  ],
  gitRepository: [
    { required: true, message: 'gitRepository为必填项', trigger: 'blur' },
  ],
  gitProjectName: [{ required: true, message: 'gitProjectName为必填项', trigger: 'blur' }],
  desc: [{ required: true, message: 'desc为必填项', trigger: 'blur' }],
  people: [{ required: true, message: 'people为必填项', trigger: 'blur' }],
  status: [{ required: true, message: 'status为必填项', trigger: 'change' }],
  buildFolder: [{ required: true, message: 'buildFolder为必填项', trigger: 'blur' }],
  buildHtml: [{ required: true, message: 'buildHtml为必填项', trigger: 'blur' }],
})
const formRef = ref(null)



// 获取详情信息
const getDetailInfo = async () => {
  try {
    const {
      status,
      data: { message, result: res },
    } = await requestByDetail({ id: +route.query.id })
    if (status === 200) {
      // form.value = res
      const formKeys = Object.keys(form.value)
      formKeys.forEach(key => (form.value[key] = res[key]))
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

if(flag.value === 'add') {
  breadcrumbList.value = ['项目管理', '新增项目']
} else if(flag.value === 'detail') {
  breadcrumbList.value= ['项目管理', '项目详情']
  getDetailInfo()
} else if(flag.value === 'edit') {
  breadcrumbList.value= ['项目管理', '编辑项目']
  getDetailInfo()
}
// 新增
const add = async () => {
  try {
    const {
      status,
      data: { message, result: res },
    } = await requestByAdd(form.value)
    if (status === 200) {
      ElMessage({
        type: 'success',
        message: message,
        showClose: true,
        center: true,
        grouping: true,
      })
      router.push({ name: 'projectList' })
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

// 修改
const edit = async () => {
  try {
    const {
      status,
      data: { message, result: res },
    } = await requestByEdit({
      ...form.value,
      id: +route.query.id,
    })
    if (status === 200) {
      ElMessage({
        type: 'success',
        message: message,
        showClose: true,
        center: true,
        grouping: true,
      })
      router.push({ name: 'projectList' })
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

const submitForm = () => {
  formRef.value.validate(valid => {
    if (valid) {
      // form校验通过的逻辑
      if (flag.value === 'add') {
        add()
      } else if(flag.value === 'edit') {
        edit()
      }
    } else {
      // form校验未通过的逻辑
      return false
    }
  })
}
</script>

<template>
  <div class="projectDetail">
    <breadcrumb :breadcrumb-list="breadcrumbList" />

    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      class="myForm"
      label-width="150px"
      label-position="left"
      :disabled="flag === 'detail'"
    >
      <el-form-item label="项目名称：" prop="name">
        <el-input style="width: 300px" clearable v-model="form.name" />
      </el-form-item>

      <el-form-item label="简介" prop="desc">
        <el-input clearable v-model="form.desc" type="textarea" />
      </el-form-item>
      
      <el-form-item label="所属git库" prop="gitRepository">
        <el-input style="width: 300px" clearable v-model="form.gitRepository" />
      </el-form-item>

      <el-form-item label="打包产物路径（一般为dist）：" prop="buildSrc">
        <el-input style="width: 300px" clearable v-model="form.buildSrc" />
      </el-form-item>

      <el-form-item label="test/pre/prod文件路径：" prop="gitProjectName">
        <el-input style="width: 300px" clearable v-model="form.gitProjectName" />
      </el-form-item>

      <el-form-item label="打包产物html名称" prop="buildHtml">
        <el-input style="width: 300px" clearable v-model="form.buildHtml" />
      </el-form-item>

      <el-form-item label="打包产物文件夹名称" prop="buildFolder">
        <el-input style="width: 300px" clearable v-model="form.buildFolder" />
      </el-form-item>

      <el-form-item label="node版本：" prop="gitProjectName">
        <el-select
          v-model="form.nodeEnv"
          style="width: 300px"
          placeholder="请选择node版本"
          clearable
        >
          <el-option v-for="item in nodeEnum" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="维护人员" prop="people">
        <el-input clearable v-model="form.people" type="textarea" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="USE">使用中</el-radio>
          <el-radio label="UNUSE">已弃用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button v-if="flag !== 'detail'" type="info" @click="submitForm">
          {{ flag === 'add' ? '新增' : flag === 'edit' ? '编辑' : '详情'}} 
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scope>
.projectDetail {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 0 20px;
  .el-breadcrumb {
    height: 36px;
    line-height: 36px;
  }
  .myForm {
    flex: 1;
    overflow: auto;
    margin-bottom: 20px;
  }
}
</style>
