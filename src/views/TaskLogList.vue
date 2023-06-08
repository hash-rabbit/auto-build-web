<template>
    <div>
        <el-breadcrumb separator="/" class="bc">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/task/list' }">任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header">
            <el-select v-model="projectid" class="m-r-2" placeholder="Project" @change="projectChange" clearable>
                <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-select v-model="taskid" class="m-r-2" placeholder="Task" @change="taskChange" clearable>
                <el-option v-for="item in tasks" :key="item.id" :label="item.branch" :value="item.id" />
            </el-select>
            <el-button type="primary" @click="handleRefresh">刷新</el-button>
        </div>
        <el-divider class="divider"/>
        <el-table :data="tableData" style="width: 100%">
            <!-- <el-table-column prop="id" label="Id" width="150" /> -->
            <el-table-column prop="name" label="Project" width="130" />
            <el-table-column prop="branch" label="Task" width="150" />
            <el-table-column prop="status" label="Status" width="120">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 0" type="info">初始化</el-tag>
                    <el-tag v-if="scope.row.status == 1" type="warning">编译中</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="success">编译成功</el-tag>
                    <el-tag v-if="scope.row.status == 3" type="danger">编译失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip class="wrap" prop="description" label="Description" width="300" />
            <el-table-column prop="url" label="Url" width="600">
                <template #default="scope">
                    <el-tooltip effect="dark" content="点击复制" placement="top">
                        <span @click="copyUrl(scope.row.url)" class="pointer">{{ scope.row.url }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="version" label="GO环境" width="120" />
            <el-table-column prop="create_at" label="CreateAt" width="250" />
            <el-table-column prop="finish_at" label="FinishAt" width="250" />
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleOutout(scope.row.id)">日志</el-button>
                    <el-button link type="primary" size="small" @click="window.open(scope.row.url)">下载</el-button>
                    <el-button link type="primary" size="small" @click="reBuild(scope.row.task_id)">重新编译</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination layout="prev, pager, next" :total="1000" /> -->
        <el-dialog v-model="outputVisible" title="日志" width="50%">
            <div class="text">
                <span>
                    <el-text class="wrap">{{ output }}</el-text>
                </span>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="outputVisible = false">关闭</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus'

let axios = inject("axios");

let tableData = ref([])

let projects = ref([])
let projectid = ref(null)

let tasks = ref([])
let taskid = ref(null)

let outputVisible = ref(false)
let output = ref("")

onMounted(() => {
    axios.get("/project/list").then((response) => {
        console.log(response);
        if (response.code === "success") {
            projects.value = response.data
        }
    })

    getTaskLog()
})

const projectChange = () => {
    tasks.value = []

    if (projectid.value) {
        let param = {
            project_id: projectid.value
        }
        axios.get("/task/list", { params: param }).then((response) => {
            console.log(response);
            if (response.code === "success") {
                tasks.value = response.data
            }
        })
    }

    getTaskLog()
}

const taskChange = () => {
    getTaskLog()
}

const handleRefresh = () => {
    getTaskLog()
}

const getTaskLog = () => {
    let param = {
        project_id: projectid.value ? projectid.value : 0,
        task_id: taskid.value ? taskid.value : 0,
    }
    axios.get("/task/log/list", { params: param }).then((response) => {
        console.log(response);
        if (response.code === "success") {
            tableData.value = response.data
        }
    })
}

const handleOutout = (id) => {
    let param = {
        task_log_id: id
    }
    axios.get("/task/log/output", { params: param }).then((response) => {
        console.log(response);
        if (response.code === "success") {
            output.value = response.data
            outputVisible.value = true
        }
    })
}


const reBuild = (id) => {
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
        } else {
            ElMessage({
                message: response.msg,
                type: 'warning',
            })
        }
        getTaskLog()
    })
}

const copyUrl = (url) => {
    copyToClipboard(url).then(function () {
        ElMessage({
            message: "拷贝到剪切板成功",
            type: 'success',
        })
    }, function () {
        ElMessage({
            message: "拷贝失败",
            type: 'warning',
        })
    });
}

const copyToClipboard = (textToCopy) => {
    // navigator clipboard 需要https等安全上下文
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        textArea.style.opacity = 0;
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

</script>

<style>
@import '../assets/main.css';

.wrap {
    white-space: pre-wrap;
}

.text {
    border: 1px solid rgb(186, 186, 186);
    border-radius: 20px;
    padding: 10px;
}

.pointer:hover {
    cursor: pointer;
}

.header {
    padding: 5px;
    /* background-color: antiquewhite; */
}

.m-r-2 {
    margin-right: 20px;
}

.divider {
  margin: 14px 0px;
}

</style>