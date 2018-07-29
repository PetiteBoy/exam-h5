<template>
  <div class="container">
    <Header class="head"></Header>
    <div id="body">
      <div class="notice">
        <div>{{ notice.title ? notice.title : '公告' }}</div>
        <textarea disabled style="resize: none; width: 100%; height: 400px" v-model="notice.content"></textarea>
      </div>
      <el-button type="primary" @click="navigation()">开始学习</el-button>
    </div>
  </div>
</template>

<script>
import service from '../../../service/service.js'
import Header from '../../../components/part/Header.vue'

export default {
  name: 'Notice',
  data () {
    return {
      notice: ''
    }
  },
  components: {
    Header
  },
  mounted () {
    service.requestUrl({
      url: '/notice/find/checkvideo',
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
