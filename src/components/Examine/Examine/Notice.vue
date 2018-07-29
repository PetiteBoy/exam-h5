<template>
  <div class="container">
    <div class="notice">
      <div>{{ notice.title ? notice.title : '公告' }}</div>
      <textarea disabled style="resize: none; width: 100%; height: 400px" v-model="notice.content"></textarea>
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
      notice: ''
    }
  },
  mounted () {
    service.requestUrl({
      url: '/notice/find/checkquestion',
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
        this.$router.push('/')
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
    navigation () {
      service.requestUrl({
        url: '/question/init',
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
          this.$router.push('/')
        }
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
</style>
