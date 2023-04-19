<template>
    <div>
        <div>
            <el-select v-model="taskid" class="m-2" placeholder="Task" @change="selectChange">
                <el-option v-for="item in options" :key="item.id" :label="item.branch + ' - ' + item.main_file"
                    :value="item.id" />
            </el-select>
        </div>
        <el-divider />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="id" label="Id" width="150" />
            <el-table-column prop="status" label="Status" width="150">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 0" type="info">初始化</el-tag>
                    <el-tag v-if="scope.row.status == 1" type="warning">编译中</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="success">编译成功</el-tag>
                    <el-tag v-if="scope.row.status == 3" type="danger">编译失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="url" width="300" />
            <el-table-column prop="create_at" label="CreateAt" width="300" />
            <el-table-column prop="finish_at" label="FinishAt" width="300" />
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default>
                    <el-button link type="primary" size="small" disabled @click="handleClick">详情</el-button>
                    <!-- <el-button link type="primary" size="small" disabled @click="handleClick">日志</el-button> -->
                    <el-button link type="primary" size="small" disabled @click="handleClick">错误日志</el-button>
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
let options = ref([])
let taskid = ref(null)
onMounted(() => {
    axios.get("/task/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            options.value = response.data
        }
    })
    axios.get("/task/log/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            tableData.value = response.data
        }
    })
})
const handleClick = () => {

}
const selectChange = () => {
    console.log(taskid.value);
    let param = {
        task_id: taskid.value
    }
    axios.get("/task/log/list", { params: param }).then((response) => {
        console.log(response);
        if (response.code === "success") {
            tableData.value = response.data
        }
    })
}
</script>