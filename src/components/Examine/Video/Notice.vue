<template>
  <div class="container">
    <div class="notice">
      <div>{{ notice.title ? notice.title : '公告' }}</div>
      <textarea disabled style="resize: none; width: 100%; height: 400px" v-model="notice.content"></textarea>
    </div>
    <el-button type="primary" @click="navigation()">开始学习</el-button>
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
      url: '/notice/find/checkvideo',
      method: 'get'
    }).then(res => {
      const data = res.data
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
      this.$router.push('/Examine/Video/List')
    }
  }
}
</script>

<style scoped>
  .notice {
    padding: 20px;
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
