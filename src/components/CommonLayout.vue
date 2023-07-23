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
          <el-menu-item index="/project/list">
            <el-icon>
              <Grid />
            </el-icon>
            <span>项目列表</span>
          </el-menu-item>
          <el-menu-item index="/task/list">
            <el-icon>
              <Promotion />
            </el-icon>
            <span>任务列表</span>
          </el-menu-item>
          <el-menu-item index="/task/log/list">
            <el-icon>
              <Management />
            </el-icon>
            <span>任务记录</span>
          </el-menu-item>
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
