<template>
  <div class="container">
    <div class="notice">
      <div>{{ notice.title ? notice.title : '公告' }}</div>
      <textarea disabled style="resize: none; width: 100%; height: calc(100% - 60px)" v-model="notice.content"></textarea>
    </div>
    <div class="noticeTips">
      <i :class="iClass ? 'el-icon-circle-check active' : 'el-icon-circle-check'" @click="changeClass"></i>
      我已认真读完
    </div>
    <el-button :type="iClass ? 'primary' : 'info'" @click="navigation()">前去观看视频</el-button>
  </div>
</template>

<script>
import service from '../../../service/service.js'

export default {
  name: 'Notice',
  data () {
    return {
      notice: '',
      iClass: true
    }
  },
  mounted () {
    service.requestUrl({
      url: '/notice/find/checkvideo',
      method: 'get'
    }).then(res => {
      this.notice = res
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    navBack () {
      window.history.back()
    },
    changeClass () {
      this.iClass = !this.iClass
    },
    navigation () {
      if (!this.iClass) return
      this.$router.push('/Examine/Video/List?id=8')
    }
  }
}
</script>

<style scoped>
  .notice {
    padding: 20px 40px;
    background-color: #fff;
    height: calc(100% - 160px);
  }

  .notice div {
    font-size: 28px;
    padding-bottom: 20px;
  }

  .notice textarea {
    text-align: left;
    border: 0;
    font-size: 18px;
    display: block;
    line-height: 36px;
    color: #54667A;
  }

  .noticeTips {
    font-size: 18px;
    padding: 20px;
  }

  .noticeTips i {
    color: #909399;
    cursor: pointer;
  }

  .noticeTips i.active {
    color: #409EFF;
  }
</style>
