<template>
    <div>
        <el-breadcrumb separator="/" class="bc">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/task/list' }">任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header">
            <el-select v-model="projectid" class="m-2" placeholder="Project" @change="selectChange" clearable>
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-button class="right" type="primary" @click="showDialog = true">新建任务</el-button>
        </div>
        <el-divider class="divider"/>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="name" label="Project" width="120" />
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
                    <!-- <el-button link type="primary" size="small" disabled @click="handleClick">详情</el-button> -->
                    <el-button link type="primary" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="showDialog" :title="dialogTitle" destroy-on-close>
            <TaskAdd @add-event="closeDialog"></TaskAdd>
        </el-dialog>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import TaskAdd from '../components/TaskAdd.vue';

const router = useRouter()
let axios = inject("axios");
let tableData = ref([])
let options = ref([])
let projectid = ref(null)
let showDialog = ref(false)
let dialogTitle = ref("新建任务")

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

const deleteHandle = (id)=>{
    let param = {
        id: id
    }
    axios.delete("/task/delete", {data:param}).then((response) => {
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

const closeDialog = () =>{
    showDialog.value = false
    refreshData()
}

</script>

<style>
@import '../assets/main.css';
.header {
    padding: 5px;
    display: flex;
}

.right {
    margin-left: auto;
}
</style>