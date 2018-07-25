<template>
    <div class="container">
        <div class="header">
            <span>{{ name }}</span>
            <span>退出</span>
        </div>

        <div class="notice">{{ notice }}</div>

        <div class="tools">
            <div>满分教育(敬请期待)</div>
            <div @click="navigation('/Examine/Index')">审验教育</div>
            <div @click="navigation('/User/Admin')">个人信息</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                name: 'test',
                notice: '公告'
            }
        },
        mounted() {
        },
        methods: {
            navigation(res) {
                this.$router.push(res)
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 60px;
        background: #545c64;
        width: 100%;
        line-height: 60px;
        color: #ffffff;
        text-align: right;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .header span {
        cursor: pointer;
        margin-right: 15px;
    }

    .header span:hover {
        color: #dddddd;
    }

    .notice {
        width: 1000px;
        height: 400px;
        border: 1px #ddd solid;
        margin: 20px auto;
    }

    .tools {
        width: 1000px;
        margin: 20px auto;
        display: flex;
        justify-content: space-between;
    }

    .tools div {
        width: 30%;
        height: 100px;
        border: 1px #ddd solid;
    }
</style>
