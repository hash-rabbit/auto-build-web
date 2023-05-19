<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/task/list' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加任务</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="center">
        <el-form :model="form" label-width="120px">
            <el-form-item label="项目">
                <el-select v-model="form.project_id">
                    <el-option v-for="item in projectOPtions" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="Golang 版本">
                <el-select v-model="form.go_version_id">
                    <el-option v-for="item in envOptions" :key="item.id" :label="item.version" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="Branch">
                <el-input v-model="form.branch" placeholder="master" />
            </el-form-item>
            <el-form-item label="自动编译">
                <el-select v-model="form.auto_build">
                    <el-option label="是" :value="true" />
                    <el-option label="否" :value="false" />
                </el-select>
            </el-form-item>
            <el-form-item label="MainFile">
                <el-input v-model="form.main_file" placeholder="main.go" />
            </el-form-item>
            <el-form-item label="DestFile">
                <el-input v-model="form.dest_file" placeholder="main" />
            </el-form-item>
            <el-form-item label="目标系统">
                <el-select v-model="form.dest_os">
                    <el-option label="linux" value="linux" />
                    <el-option label="macos" value="darwin" />
                    <el-option label="windows" value="windows" />
                </el-select>
            </el-form-item>
            <el-form-item label="目标架构">
                <el-select v-model="form.dest_arch">
                    <el-option label="x86-64" value="amd64" />
                    <el-option label="ARM64" value="arm64" />
                    <el-option label="x86" value="386" />
                </el-select>
            </el-form-item>
            <el-form-item label="环境变量">
                <el-input v-model="form.env" placeholder="key=value;key2=value2" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Add</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script setup>
import { reactive, inject, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const axios = inject("axios");
const form = reactive({
    project_id: null,
    go_version_id: null,
    branch: "",
    auto_build:false,
    main_file: "",
    dest_file: "",
    dest_os: "linux",
    dest_arch: "amd64",
    env: ""
})

let envOptions = ref([])
let projectOPtions = ref([])

onMounted(() => {
    axios.get("/goenv/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            envOptions.value = response.data
        } else {
            ElMessage({
                message: response.msg,
                type: 'success',
            })
        }
    })
    axios.get("/project/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            projectOPtions.value = response.data
        } else {
            ElMessage({
                message: response.msg,
                type: 'success',
            })
        }
    })
})

const onSubmit = () => {
    console.log(form);
    form.go_version_id = Number(form.go_version_id)
    form.project_id = Number(form.project_id)
    axios.post("/task/add", form).then((response) => {
        console.log(response);
        if (response.code === "success") {
            ElMessage({
                message: response.msg,
                type: 'success',
            })
        } else {
            ElMessage({
                message: response.msg,
                type: 'warning',
            })
        }
    })
}
</script>
  
<style>
.center {
    margin-top: 20px;
    width: 500px;
    margin: 20px auto 0 auto;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>