<template>
    <div>
        <el-breadcrumb separator="/" class="bc">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/project/list' }">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="name" label="Name" width="120" />
            <el-table-column prop="url" label="Url(git)" width="300" />
            <el-table-column prop="go_mod" label="GoMod" width="100" />
            <el-table-column prop="main_branch" label="主分支" width="100" />
            <el-table-column prop="workspace" label="WorkSpace" width="300" />
            <el-table-column prop="path" label="ProjectPath" width="500" />
            <el-table-column prop="env" label="环境变量" width="300" />
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" disabled @click="handleClick">详情</el-button>
                    <el-button link type="primary" size="small" @click="pullProject(scope.row.id)">更新</el-button>
                    <el-button link type="primary" size="small" disabled>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import {ElMessage} from 'element-plus';

let axios = inject("axios");
let tableData = ref([])

onMounted(() => {
    axios.get("/project/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            tableData.value = response.data
        }
    })
})

const handleClick = () => {

}

const pullProject = (id)=>{
    let param = {
        project_id : id
    }
    axios.post("/project/pull", param).then((response) => {
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
@import '../assets/main.css';
</style>