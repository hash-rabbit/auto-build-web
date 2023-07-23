<template>
    <div class="p-30">
        <el-row :gutter="20">
            <el-col :span="6">
                <div>
                    <el-card shadow="hover">
                        <el-statistic :value="commonInfo.today_count">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    今日编译任务
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day" placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较于昨天</span>
                                <span v-if="commonInfo.today_count > commonInfo.yesterday_count" class="green">
                                    {{ commonInfo.today_count - commonInfo.yesterday_count }}
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                                <span v-else class="red">
                                    {{ commonInfo.yesterday_count - commonInfo.today_count }}
                                    <el-icon>
                                        <CaretBottom />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <el-card shadow="hover">
                        <el-statistic :value="commonInfo.month_count">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    本月编译任务
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day" placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较于上个月</span>
                                <span v-if="commonInfo.month_count > commonInfo.last_month_count" class="green">
                                    {{ commonInfo.month_count - commonInfo.last_month_count }}
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                                <span v-else class="red">
                                    {{ commonInfo.last_month_count - commonInfo.month_count }}
                                    <el-icon>
                                        <CaretBottom />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <el-card shadow="hover">
                        
                        <el-statistic :value="0">
                            <template #title>
                                <div>待添加数据</div>
                                <!-- TODO: 平均耗时 -->
                                <!-- <div style="display: inline-flex; align-items: center">
                                    Daily active users
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day" placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div> -->
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>待添加数据</span>
                                <span class="green">
                                    0%
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <el-card shadow="hover">
                        <el-statistic :value="0">
                            <template #title>
                                <div>待添加数据</div>
                                <!-- TODO:  -->
                                <!-- <div style="display: inline-flex; align-items: center">
                                    Daily active users
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day" placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div> -->
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>待添加数据</span>
                                <span class="red">
                                    0%
                                    <el-icon>
                                        <CaretBottom />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="m-t-30">
            <el-col :span="18">
                <div>
                    <el-card shadow="hover">
                        <BarChart title="近 30 日编译任务数" :xdata="commonInfo.month_count_date"
                            :ydata="commonInfo.month_count_graph" linename="编译数"></BarChart>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <el-card shadow="hover">
                        <template #default>
                            <div class="h-350">
                                <div>待添加数据</div>
                                <!-- TODO: 最近的 10 个项目,编译数量最多的十个项目 -->
                                <!-- <div>header</div>
                                <div v-for="o in 10" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
                            </div>
                        </template>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import {
    CaretBottom,
    CaretTop,
    Warning,
} from '@element-plus/icons-vue'
import BarChart from '../components/BarChart.vue';

let axios = inject("axios");

let commonInfo = ref({})

onMounted(() => {
    axios.get("/home/info").then((response) => {
        console.log(response);
        if (response.code === "success") {
            commonInfo.value = response.data
        }
    })
})

</script>

<style scoped>
.p-30 {
    padding: 30px;
}

.m-t-30 {
    margin-top: 30px;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}

.h-350 {
    height: 350px;
}
</style>