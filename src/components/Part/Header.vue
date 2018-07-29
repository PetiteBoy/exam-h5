<template>
  <div class="header">
    <span class="l" @click="returnBack()">返回</span>
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
    logout () {
      removeSessionStorage('authKey')
      this.$router.push('/login')
    },
    returnBack () {
      this.$router.push('/Home')
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
</style>
