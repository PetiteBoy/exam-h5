<template>
  <div class="container">
    <div class="noticeBack">
      <i class="el-icon-arrow-left" @click="navBack"></i>
    </div>
    <div class="notice">
      <div>{{ notice.title ? notice.title : '公告' }}</div>
      <textarea disabled style="resize: none; width: 100%; min-height: 480px" v-model="notice.content"></textarea>
    </div>
    <div class="noticeTips" v-if="!status">提示：您还未完成视频学习要求，完成后才可参加考题测试</div>
    <el-button :type="status ? 'primary' : 'info'" @click="navigation()">开始测试</el-button>
  </div>
</template>

<script>
import service from '../../../service/service.js'

export default {
  name: 'Notice',
  data () {
    return {
      notice: '',
      status: 1
    }
  },
  mounted () {
    service.requestUrl({
      url: '/video/config/check/state',
      method: 'get'
    }).then(res => {
      const that = this
      res.map(function (v) {
        if (v.learnNum !== v.completeNum) {
          that.status = 0
        }
      })
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })

    service.requestUrl({
      url: '/notice/find/checkquestion',
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
    navigation () {
      if (!this.status) return
      service.requestUrl({
        url: '/question/init',
        method: 'get'
      }).then(res => {
        this.$router.push(`Examine?totalNum=${res.totalNum}&period=${res.period}`)
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
  .noticeBack {
    text-align: left;
  }

  .noticeBack i {
    font-size: 20px;
    cursor: pointer;
    padding-right: 15px;
    padding-bottom: 15px;
  }

  .notice {
    width: 880px;
    min-height: 520px;
    padding: 20px 60px;
    background-color: #fff;
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
</style>
