<template>
    <div class="container">
        <div class="result">
            <div>考试结果</div>
            <el-row :gutter="20" v-for="item in list">
                <el-col :offset="9" :span="3">{{ item.k }}</el-col>
                <el-col :span="3">{{ item.v }}</el-col>
            </el-row>
            <el-button type="primary">交卷</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Result",
        data() {
            return {
                list: [{
                    k: '考试用时',
                    v: '00:12:34'
                }, {
                    k: '答对',
                    v: '99题'
                }, {
                    k: '答错',
                    v: '1题'
                }]
            }
        }
    }
</script>

<style scoped>
    .result {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: auto;
        height: 300px;
    }

    .result > div:first-child {
        font-size: 24px;
        font-weight: bold;
        line-height: 50px;
    }

    .result div {
        line-height: 40px;
    }

    button{
        margin-top: 20px;
    }
</style>
