<template>
    <div class="container">
        <div class="task">
            <div class="taskHeader">
                <div>
                    <div>学习要求</div>
                    <el-tooltip class="item" effect="dark" :content="tips" placement="right">
                        <el-button :type="buttonType ? 'primary' : 'info'" @click="navigation(buttonType ? 'examine' : 'forbid')">{{ buttonContent }}</el-button>
                    </el-tooltip>
                </div>
                <div>
                    <div>今日至少学习3小时，目前已经学习{{ taskNowLong }}</div>
                    <div>提示：请务必保证学习时长大于3小时，否则无法生成相应学习记录</div>
                </div>
            </div>
            <div class="taskList">
                <el-row :gutter="20" v-for="item in taskList">
                    <el-col :span="6">{{ item.k }}</el-col>
                    <el-col :span="3" :class="1 == item.status ? 'success' : 0 == item.status ? 'danger' : 'info'">{{ item.v }}</el-col>
                </el-row>
            </div>
        </div>
        <div class="list">
            <div v-for="item in list">
                <div class="listTitle">{{ item.title }}</div>
                <el-row class="listContent" :gutter="20">
                    <el-col :span="8" v-for="videoItem in item.videoList">
                        <img :src="videoItem.img" alt="">
                        <el-row :gutter="20">
                            <el-col :span="16">
                                <div class="listInfo">
                                    <div class="overwrap">{{ videoItem.id }} {{ videoItem.title }}</div>
                                    <div class="overwrap">{{ videoItem.time }}</div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="primary" style="width: 100%;" @click="navigation(videoItem.id)">继续观看
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoList",
        data() {
            return {
                tips: '需完成下列任务才可进行答题',
                buttonType: 1,
                buttonContent: '进行试题测验',

                taskNowLong: '2小时32分钟',
                taskList: [{
                    k: '分类1至少完整学习1个视频',
                    v: '未完成',
                    status: 0
                }, {
                    k: '分类2至少完整学习2个视频',
                    v: '已完成',
                    status: 1
                }, {
                    k: '分类3至少完整学习3个视频',
                    v: '无强制要求',
                    status: -1
                }],

                list: [{
                    title: '分类1 道路安全法',
                    videoList: [{
                        id: 1,
                        time: 123,
                        title: '猜猜看猜猜看猜猜看猜猜看猜猜看猜猜看猜猜看',
                        status: 1,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }, {
                        id: 2,
                        time: 223,
                        title: '猜猜看',
                        status: 2,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }, {
                        id: 3,
                        time: 323,
                        title: '猜猜看',
                        status: 3,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }, {
                        id: 4,
                        time: 423,
                        title: '猜猜看',
                        status: 4,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }]
                }, {
                    title: '分类1 道路安全法',
                    videoList: [{
                        id: 1,
                        time: 123,
                        title: '猜猜看',
                        status: 1,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }, {
                        id: 2,
                        time: 223,
                        title: '猜猜看',
                        status: 2,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }, {
                        id: 3,
                        time: 323,
                        title: '猜猜看',
                        status: 3,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }, {
                        id: 4,
                        time: 423,
                        title: '猜猜看',
                        status: 4,
                        img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg'
                    }]
                }]
            }
        },
        methods: {
            navigation(res) {
                if ('examine' == res) {
                    this.$router.push('/Examine/Examine/Notice');
                    return;
                }

                if ('forbid' == res) return;

                this.$router.push(`Info?id=${res}`)
            }
        }
    }
</script>

<style scoped>
    .taskHeader {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px #ddd solid;
        padding-bottom: 20px;
    }

    .taskHeader > div:first-child div {
        font-size: 24px;
        line-height: 40px;
        display: inline-block;
        padding-right: 40px;
    }

    .taskHeader > div:last-child {
        text-align: right;
    }

    .taskList {
        text-align: left;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .taskList .success {
        color: #67C23A;
    }

    .taskList .danger {
        color: #F56C6C;
    }

    .taskList .info {
        color: #909399;
    }

    .list {
        text-align: left;
    }

    .listTitle {
        font-size: 18px;
        padding-bottom: 20px;
        border-bottom: 1px #ddd solid;
    }

    .listContent {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .list img {
        width: 100%;
    }

    .listInfo {
        padding-bottom: 20px;
    }


</style>
