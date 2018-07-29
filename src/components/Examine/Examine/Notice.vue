<template>
  <div class="container">
    <div class="notice">
      <div>{{ title }}</div>
      <div>{{ content }}</div>
    </div>
    <el-button type="primary" @click="navigation()">开始测试</el-button>
  </div>
</template>

<script>
import service from '../../../service/service.js'

export default {
  name: 'Notice',
  data () {
    return {
      title: '公告，你猜',
      content: '就不猜'
    }
  },
  methods: {
    navigation () {
      service.requestUrl({
        url: '/question/init',
        method: 'get'
      }).then(res => {
        const data = res.data
        console.log(data)
        this.$router.push(`Examine?totalNum=${data.data.totalNum}&period=${data.data.period}`)
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style scoped>
  .notice {
    padding: 40px;
    border: 1px #ddd solid;
    margin-bottom: 40px;
  }

  .notice > div:first-child {
    font-size: 24px;
    padding-bottom: 20px;
  }

  .notice > div:last-child {
    text-align: left;
    text-indent: 2em;
  }
</style>
