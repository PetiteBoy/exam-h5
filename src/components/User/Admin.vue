<template>
  <div class="container">
    <div class="title">个人信息</div>
    <el-row :gutter="20" v-for="(item, index) in userInfo" :key="index">
      <el-col :span="6">{{ item.k }}</el-col>
      <el-col :span="18">{{ item.v }}</el-col>
    </el-row>
  </div>
</template>

<script>
import service from '../../service/service.js'

export default {
  name: 'Admin',
  data () {
    return {
      userInfo: [{
        k: '手机号码',
        v: ''
      }, {
        k: '准驾车型',
        v: ''
      }, {
        k: '驾驶证号',
        v: ''
      }, {
        k: '驾驶证有效期',
        v: ''
      }, {
        k: '证件类型',
        v: ''
      }, {
        k: '证件号码',
        v: ''
      }, {
        k: '注册时间',
        v: ''
      }]
    }
  },
  mounted () {
    service.requestUrl({
      url: '/user/info'
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
        this.$router.push('/')
      }
      this.userInfo[0].v = data.data.phone
      this.userInfo[1].v = data.data.licenseType
      this.userInfo[2].v = data.data.licenseNo
      this.userInfo[3].v = `${this.time(data.data.licenseBeginDate)} 至 ${this.time(data.data.licenseEndDate)}`
      this.userInfo[4].v = data.data.idType
      this.userInfo[5].v = data.data.idNo
      this.userInfo[6].v = this.time(data.data.createTime)
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    time (timestamp) {
      const newDate = new Date()
      newDate.setTime(timestamp)
      return newDate.toLocaleDateString()
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
