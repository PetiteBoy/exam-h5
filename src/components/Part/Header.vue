<template>
  <div class="header">
    <span class="l">机动车驾驶人教育管理平台</span>
    <span>{{ userName }}</span>
    <span @click="logout()">注销</span>
  </div>
</template>

<script>
import { removeSessionStorage } from '../../utils/base.js'
import service from '../../service/service.js'

export default {
  name: 'Header',
  data () {
    return {
      userName: ''
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      service.requestUrl({
        url: '/user/info'
      }).then(res => {
        this.userName = res.realname
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    },
    logout () {
      removeSessionStorage('authKey')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .header {
    height: 60px;
    width: 100%;
    line-height: 60px;
    color: #54667a;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: solid 1px #e6e6e6;
  }

  .header span:first-child {
    background-color: #f2f7f8;
    display: inline-block;
    width: 249px;
    margin: 0;
    border-right: solid 1px #e6e6e6;
    text-align: center;
    cursor: default;
  }

  .header span {
    cursor: pointer;
    margin-left: 15px;
    margin-right: 15px;
  }

  .header span:hover {
    color: #333;
  }
</style>
