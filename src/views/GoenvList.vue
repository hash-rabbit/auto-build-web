<template>
    <div>
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="Approved by">
                <el-input v-model="formInline.user" placeholder="Approved by" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select v-model="formInline.region" placeholder="Activity zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form> -->
        <el-divider></el-divider>
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