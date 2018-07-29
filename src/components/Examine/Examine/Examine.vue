<template>
  <div class="container">
    <div id="body">
      <video id="video" class="r"></video>
      <div class="title">第{{ questionNum }}题/共{{ total }}题 <span>倒计时 {{ time }}</span></div>
      <el-row :gutter="20">
        <el-col :span="24">{{ question }}</el-col>
      </el-row>
      <div class="options ovh">
        <el-radio-group class="l" :span="img ? 18 : 24" v-model="userAnswers" @change="answers" :disabled="finish">
          <el-radio class="radioItem" v-for="item in optionsArr" :key="item.k" :label="item.k">{{ item.v }}</el-radio>
        </el-radio-group>
        <img v-if="img" class="optionsImg" :src="img">
      </div>
      <div v-if="finish">
        <div :class="userAnswers === answer ? 'success' : 'danger'">您的答案：{{ userAnswers }}</div>
        <div class="success"> 正确答案：{{ answer }}</div>
        <div class="answerContentTitle">题目详解:</div>
        <div class="answerContent">{{ explains }}</div>
      </div>
      <el-button :type="finish ? 'primary' : 'info'" @click="total > questionNum ? nextQuestion() : record()">{{ total > questionNum ? '下一题' : '完成' }}</el-button>
    </div>
  </div>
</template>

<script>
import service from '../../../service/service.js'

export default {
  name: 'Examine',
  data () {
    return {
      finish: false,
      questionNum: 0,
      total: 100,
      time: '00:45:00',
      timestamp: '',
      timestampOld: '',
      img: '',
      question: '',
      optionsArr: '',
      radio: '',
      answer: 1,
      explains: '',
      userAnswers: '',
      answerRight: 0,
      answerWrong: 0,
      countDownInterval: ''
    }
  },
  mounted () {
    this.webRtc()
    // this.bindCapture()
    this.total = this.$route.query.totalNum
    this.timestampOld = this.$route.query.period * 60
    this.timestamp = this.$route.query.period * 60
    const that = this

    this.countDownInterval = setInterval(function () {
      that.timestamp--
      that.time = that.$parent.secondToDate(that.timestamp).date

      if (!that.timestamp) {
        that.record()
      }
    }, 1000)
    this.nextQuestion()
  },
  methods: {
    nextQuestion () {
      if (this.userAnswers === '' && this.questionNum) return
      this.userAnswers = ''
      this.finish = false
      this.questionNum++

      service.requestUrl({
        url: '/question/next',
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
        this.question = data.data.question
        this.img = data.data.url

        let optionsArr = []
        if (data.data.item1) {
          optionsArr.push({
            k: 'A',
            v: `A: ${data.data.item1}`
          })
        }
        if (data.data.item2) {
          optionsArr.push({
            k: 'B',
            v: `B: ${data.data.item2}`
          })
        }
        if (data.data.item3) {
          optionsArr.push({
            k: 'C',
            v: `C: ${data.data.item3}`
          })
        }
        if (data.data.item4) {
          optionsArr.push({
            k: 'D',
            v: `D: ${data.data.item4}`
          })
        }

        this.optionsArr = optionsArr
        this.answer = data.data.answer
        this.explains = data.data.explains
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    },
    record () {
      let costTime = this.timestampOld - this.timestamp
      clearInterval(this.countDownInterval)

      service.requestUrl({
        url: '/question/record',
        data: {
          correctNum: this.answerRight,
          wrongNum: this.answerWrong,
          costTime: costTime
        }
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
        costTime = this.$parent.secondToDate(costTime).date
        this.$router.push(`Result?correctNum=${this.answerRight}&wrongNum=${this.answerWrong}&costTime=${costTime}`)
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    },
    answers (res) {
      this.finish = true
      this.userAnswers = res

      if (this.userAnswers === this.answer) {
        this.answerRight++
      } else {
        this.answerWrong++
      }
    },
    webRtc () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      const video = document.getElementById('video')
      navigator.getUserMedia({
        video: true
      }, function (stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
      }, function (error) {
        console.log(error.name || error)
      })
    },
    bindCapture () {
      const video = document.getElementById('video')
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight
      if (videoWidth && videoHeight) {
        const canvas = document.getElementById('canvas')
        canvas.width = videoWidth
        canvas.height = videoHeight
        document.getElementById('capture').addEventListener(
          'click',
          function () {
            console.log(video)
            canvas.getContext('2d').drawImage(
              video, 0, 0, videoWidth, videoHeight
            )
          },
          false
        )
      } else {
        setTimeout(this.bindCapture, 200)
      }
    }
  }
}
</script>

<style scoped>
  #video {
    width: 200px;
    height: 150px;
    margin-bottom: 40px;
    border: 1px #ddd solid;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #000000;
  }

  .container {
    text-align: left
  }

  .container img {
    width: 100%;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 100px;
  }

  .title span {
    font-size: 14px;
  }

  .options .el-radio-group {
    width: 70%;
  }

  .options .optionsImg {
    width: 30%;
  }

  .radioItem {
    display: block;
    margin-left: 0;
    padding-bottom: 20px;
    line-height: 20px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }

  .answerContentTitle {
    padding-top: 20px;
    font-weight: bold;
  }

  .answerContent {
    line-height: 30px;
    padding-bottom: 20px;
  }

  .el-radio-group {
    display: block;
    margin-top: 20px;
  }

  .success {
    color: #67C23A;
  }

  .danger {
    color: #F56C6C;
  }

  .el-radio {
    margin-left: 30px;
  }
</style>
