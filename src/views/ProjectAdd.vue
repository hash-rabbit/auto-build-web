<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/project/list' }">项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加项目</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="center">
        <el-form :model="form" label-width="120px">
            <el-form-item label="Name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Url (Git地址)">
                <el-input v-model="form.url" />
            </el-form-item>
            <el-form-item label="Go Mod">
                <el-radio-group v-model="form.go_mod" class="ml-4">
                    <el-radio :label=true>是</el-radio>
                    <el-radio :label=false>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="WorkSpace" v-show="!form.go_mod">
                <el-input v-model="form.workspace" />
            </el-form-item>
            <el-form-item label="项目路径">
                <el-input v-model="form.path" />
            </el-form-item>
            <el-form-item label="Token">
                <el-input v-model="form.token" />
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
import { reactive, inject } from 'vue'
import { ElMessage } from 'element-plus'
const axios = inject("axios");
const form = reactive({
    name: '',
    url: '',
    go_mod: false,
    workspace: "",
    path: "",
    token: "",
    env: ""
})

const onSubmit = () => {
    console.log(form);
    axios.post("/project/add", form).then((response) => {
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