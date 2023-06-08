<template>
    <div ref="main" style="width: 100%; height: 350px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";

const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
const option = ref({
    title: {
    },
    tooltip: {},
    xAxis: {
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series: [
    ]
})

const props = defineProps({
    title: String,
    linename: String,
    xdata: Array,
    ydata: Array,
})

onMounted(
    () => {
        init()
    }
)

function init() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(main.value);
    // 指定图表的配置项和数据
    option.value.title.text = props.title
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option.value);
}

watch(() => props.xdata, async (newdate) => {
    option.value.xAxis.data = newdate
    var myChart = echarts.getInstanceByDom(main.value)
    myChart?.setOption(option.value)
})

watch(() => props.ydata, async (newdate) => {
    option.value.series[0]={
        type: 'bar',
        data:newdate
    } 
    var myChart = echarts.getInstanceByDom(main.value)
    myChart?.setOption(option.value)
})

</script>


<style scoped></style>

