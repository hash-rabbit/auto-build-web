<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px">
      <el-header>
        <div class="toolbar">Golang自动编译V1.0</div>
      </el-header>
      <el-scrollbar class="h-main">
        <el-menu :default-openeds="['/goenv', '/project', '/task']" router>
          <el-menu-item index="/">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="/goenv">
            <template #title>
              <el-icon>
                <Management />
              </el-icon>
              GO环境管理
            </template>
            <el-menu-item index="/goenv/list">Go 环境列表</el-menu-item>
            <el-menu-item index="/goenv/add">添加 Golang 环境</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/project">
            <template #title>
              <el-icon>
                <Grid />
              </el-icon>
              项目管理
            </template>
            <el-menu-item index="/project/list">项目列表</el-menu-item>
            <el-menu-item index="/project/add">添加项目</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/task">
            <template #title>
              <el-icon>
                <Promotion />
              </el-icon>
              任务管理
            </template>
            <el-menu-item index="/task/list">任务列表</el-menu-item>
            <el-menu-item index="/task/log/list">任务记录</el-menu-item>
            <el-menu-item index="/task/add">添加任务</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/about">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>关于</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="bg-gray">
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-link :icon="Share" href="https://github.com/hash-rabbit/auto-build">Github</el-link>
        </div>
      </el-header>

      <el-main class="main">
        <!-- <el-scrollbar height="100%"> -->
          <router-view></router-view>
        <!-- </el-scrollbar> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Grid, Management, Promotion, Share, HomeFilled, UserFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  /* background: var(--el-color-primary-light-8); */
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.el-aside .el-menu{
  border-right: none;
}

.h-main {
  height: calc(100vh - 60px);
  border-right: solid 2px var(--el-menu-border-color);
}

.main{
  height: calc(100vh - 60px);
}

.bg-gray{
    background-color: rgb(250, 250, 250);
}
</style>
