<template>
  <div class="container">
    <div class="header">
      <span>{{ name }}</span>
      <span @click="logout()">退出</span>
    </div>

    <div class="notice">{{ notice }}</div>

    <div class="tools">
      <el-button :span="8" type="danger">满分教育(敬请期待)</el-button>
      <el-button type="success" @click="navigation('/Examine/Index')">审验教育</el-button>
      <el-button type="primary" @click="navigation('/User/Admin')">个人信息</el-button>
    </div>
  </div>
</template>

<script>
import { removeSessionStorage } from '../utils/base.js'

export default {
  name: 'Home',
  data () {
    return {
      name: 'test',
      notice: '公告'
    }
  },
  mounted () {
  },
  methods: {
    navigation (res) {
      this.$router.push(res)
    },
    logout () {
      removeSessionStorage('authKey')
      this.$router.push('/')
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

  .tools .el-button {
    width: 300px;
    line-height: 60px;
  }
</style>
