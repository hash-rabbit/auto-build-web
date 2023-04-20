<template>
    <div>
        <el-breadcrumb separator="/" class="bc">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goenv/list' }">GO环境管理</el-breadcrumb-item>
            <el-breadcrumb-item>Go 环境列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="version" label="Version" width="120" />
            <el-table-column prop="os" label="Os" width="120" />
            <el-table-column prop="arch" label="Arch" width="120" />
            <el-table-column prop="sha2" label="Sha2" />
            <el-table-column prop="localpath" label="本地目录" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick" disabled>详情</el-button>
                    <el-button link type="primary" size="small" disabled>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
let axios = inject("axios");
let tableData = ref([])
// let formInline = ref({})/
onMounted(() => {
    axios.get("/goenv/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            tableData.value = response.data
        }
    })
})
const handleClick = () => {

}
// const onSubmit = () => {

// }
</script>

<style>
@import '../assets/main.css';
</style>