<template>
    <div class="center">
        <el-form :model="form" label-width="120px">
            <el-form-item label="Name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Url (Git地址)">
                <el-input v-model="form.url" placeholder="https://xxx.git" />
            </el-form-item>
            <el-form-item label="主分支名">
                <el-input v-model="form.main_branch" placeholder="master" />
            </el-form-item>
            <el-form-item label="Golang 版本">
                <el-select v-model="form.go_version_id">
                    <el-option v-for="item in envOptions" :key="item" :label="item" :value="item" />
                </el-select>
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
            <el-button class="m-l-50" text type="primary" @click="showMore = !showMore">更多</el-button>
            <el-form-item label="环境变量" v-show="showMore">
                <el-input v-model="form.env" placeholder='key=value&#10;key2=value2' type="textarea" :autosize="{ minRows: 3, maxRows: 7 }" />
            </el-form-item>
            <el-form-item label="编译前脚本" v-show="showMore">
                <el-input v-model="form.before_build_cmd" placeholder="#!/bin/sh&#10;echo 'before build'" type="textarea" :autosize="{ minRows: 3, maxRows: 7 }" />
            </el-form-item>
            <el-form-item label="编译后脚本" v-show="showMore">
                <el-input v-model="form.after_build_cmd" placeholder="#!/bin/sh&#10;echo 'after build'" type="textarea" :autosize="{ minRows: 3, maxRows: 7 }" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Add</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script setup>
import { reactive, inject, ref,onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const axios = inject("axios");
const emits = defineEmits(['addEvent'])

const form = reactive({
    name: '',
    url: '',
    go_version_id: "",
    main_branch: 'master',
    go_mod: true,
    workspace: "",
    path: "",
    token: "",
    env: "",
    before_build_cmd:"",
    after_build_cmd:""
})
let showMore = ref(false)
let envOptions = ref([])


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
            emits('addEvent')
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
    width: 500px;
    margin: 0px auto 0 auto;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.m-l-50{
    margin-left: 50px;
}
</style>