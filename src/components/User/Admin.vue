<template>
    <div class="container">
        <div class="title">个人信息</div>
        <el-row :gutter="20" v-for="item in userInfo">
            <el-col :span="6">{{ item.k }}</el-col>
            <el-col :span="18">{{ item.v }}</el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {
                userInfo: [{
                    k: '手机号码',
                    v: '18511112222'
                }, {
                    k: '准驾车型',
                    v: 'A1'
                }, {
                    k: '驾驶证号',
                    v: '71238d81238'
                }, {
                    k: '驾驶证有效期',
                    v: '2018-06-17至2018-06-17'
                }, {
                    k: '证件类型',
                    v: '身份证'
                }, {
                    k: '证件号码',
                    v: '71238d81238'
                }, {
                    k: '注册时间',
                    v: '2018-06-09 22:11:53'
                }]
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 1000px;
        margin: 40px auto;
        text-align: left;
    }

    .container .title {
        font-size: 24px;
        font-weight: bold;
    }

    .container > div {
        padding: 10px 0;
        border-bottom: 1px #ddd solid;
    }
</style>
