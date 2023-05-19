<template>
    <div>
        <el-breadcrumb separator="/" class="bc">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/task/list' }">任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-select v-model="projectid" class="m-2" placeholder="Project" @change="selectChange" clearable>
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>
        <el-divider />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="branch" label="Branch" width="120" />
            <el-table-column prop="main_file" label="MainFile" width="150" />
            <el-table-column prop="dest_file" label="DestFile" width="150" />
            <el-table-column prop="dest_os" label="DestOs" width="120" />
            <el-table-column prop="dest_arch" label="DestArch" width="120" />
            <el-table-column prop="auto_build" label="自动编译" width="120">
                <template #default="scope">
                    <el-switch v-model="scope.row.auto_build"
                        @change="((value) => { ChangAutoBuild(value, scope.row.id) })" />
                </template>
            </el-table-column>
            <el-table-column prop="env" label="环境变量" />
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="startBuild(scope.row.id)">编译</el-button>
                    <el-button link type="primary" size="small" disabled @click="handleClick">详情</el-button>
                    <el-button link type="primary" size="small" disabled>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
const router = useRouter()
let axios = inject("axios");
let tableData = ref([])
let options = ref([])
let projectid = ref(null)

onMounted(() => {
    axios.get("/project/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            options.value = response.data
        }
    })
    axios.get("/task/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            tableData.value = response.data
        }
    })
})

const handleClick = () => {

}

const startBuild = (id) => {
    console.log(id);
    let param = {
        task_id: id
    }
    axios.post("/task/start", param).then((response) => {
        console.log(response);
        if (response.code === "success") {
            ElMessage({
                message: response.msg,
                type: 'success',
            })
            router.push({ path: '/task/log/list' })
        } else {
            ElMessage({
                message: response.msg,
                type: 'warning',
            })
        }
    })
}

const selectChange = () => {
    refreshData()
    // console.log(projectid.value);
    // let param = {
    //     project_id: projectid.value
    // }
    // axios.get("/task/list", { params: param }).then((response) => {
    //     console.log(response);
    //     if (response.code === "success") {
    //         tableData.value = response.data
    //     }
    // })
}

const ChangAutoBuild = (val, taskid) => {
    let body = {
        id: taskid,
        auto_build: val
    }
    axios.post("/task/auto-build", body).then((response) => {
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
        refreshData()
    })
}

const refreshData = () => {
    let param = {
        project_id: projectid.value
    }
    axios.get("/task/list", { params: param }).then((response) => {
        console.log(response);
        if (response.code === "success") {
            tableData.value = response.data
        }
    })
}

</script>

<style>
@import '../assets/main.css';
</style>