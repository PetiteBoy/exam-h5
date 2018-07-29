<template>
  <div class="container">
    <div class="header">
      <span>{{ userName }}</span>
      <span @click="logout()">注销</span>
    </div>
    <div class="notice">
      <div>{{ notice.title ? notice.title : '公告' }}</div>
      <textarea disabled style="resize: none; width: 100%; height: 400px" v-model="notice.content"></textarea>
    </div>

    <div class="tools">
      <el-button :span="8" type="danger">满分教育(敬请期待)</el-button>
      <el-button type="success" @click="navigation('/Examine/Index')">审验教育</el-button>
      <el-button type="primary" @click="navigation('/User/Admin')">个人信息</el-button>
    </div>
  </div>
</template>

<script>
import { removeSessionStorage } from '../utils/base.js'
import service from '../service/service.js'

export default {
  name: 'Home',
  data () {
    return {
      notice: '',
      userName: ''
    }
  },
  mounted () {
    this.getUserInfo()
    service.requestUrl({
      url: '/notice/find/global',
      method: 'get'
    }).then(res => {
      const data = res.data
      if (data.status !== '0x0000') {
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'warning'
        })
      }
      if (data.status === '0x5002') {
        this.$parent.logout()
      }
      this.notice = data.data
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    getUserInfo () {
      service.requestUrl({
        url: '/user/info'
      }).then(res => {
        const data = res.data
        console.log(data)
        if (data.status !== '0x0000') {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'warning'
          })
        }
        if (data.status === '0x5002') {
          this.$parent.logout()
        }
        this.userName = data.data.phone
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    },
    navigation (res) {
      this.$router.push(res)
    },
    logout () {
      removeSessionStorage('authKey')
      this.$parent.logout()
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
    margin-left: 15px;
    margin-right: 15px;
  }

  .header span:hover {
    color: #dddddd;
  }

  .notice {
    width: 960px;
    min-height: 400px;
    border: 1px #ddd solid;
    margin: 20px auto;
    padding: 20px;
  }

  .notice div {
    font-size: 24px;
    padding-bottom: 20px;
  }

  .notice textarea {
    text-align: left;
    border: 0;
    font-size: 14px;
    display: block;
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
