<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goenv/list' }">GO环境管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加 Golang 环境</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="center">
        <el-form :model="form" label-width="120px">
            <el-form-item label="Url">
                <el-input v-model="form.url" />
            </el-form-item>
            <el-form-item label="Sha2">
                <el-input v-model="form.sha2" />
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
    url: '',
    sha2: '',
})

const onSubmit = () => {
    axios.post("/goenv/add", form).then((response) => {
        console.log(response);
        if (response.code === "success") {
            ElMessage({
                message: response.msg,
                type: 'success',
            })
        }else{
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