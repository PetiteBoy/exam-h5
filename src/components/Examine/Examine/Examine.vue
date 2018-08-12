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
        <div :class="userAnswers === answer ? 'primary' : 'danger'">您的答案：{{ userAnswers }}</div>
        <div class="primary"> 正确答案：{{ answer }}</div>
        <div class="answerContentTitle">题目详解:</div>
        <div class="answerContent">{{ explains }}</div>
      </div>
      <el-button :type="finish ? 'primary' : 'info'" @click="total > questionNum ? nextQuestion() : record()">{{ total > questionNum ? '下一题' : '完成' }}</el-button>
    </div>
    <div class="dialog" v-if="showDialog">
      <div class="dialogContainer">
        <div class="dialogTitle">考试结果</div>
        <div>时长： {{ costTime }}</div>
        <div>答对： {{ answerRight }}</div>
        <div>答错： {{ answerWrong }}</div>
        <el-button type="primary" @click="navback">交卷</el-button>
      </div>
    </div>
    <canvas id="canvas"></canvas>
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
      costTime: '00:00:00',
      answerRight: 0,
      answerWrong: 0,
      countDownInterval: '',
      stream: '',
      showDialog: false
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
      let costTime = that.timestampOld - that.timestamp
      that.costTime = that.$parent.secondToDate(costTime).date
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
        this.question = res.question
        this.img = res.url

        let optionsArr = []
        if (res.item1) {
          optionsArr.push({
            k: 'A',
            v: `A: ${res.item1}`
          })
        }
        if (res.item2) {
          optionsArr.push({
            k: 'B',
            v: `B: ${res.item2}`
          })
        }
        if (res.item3) {
          optionsArr.push({
            k: 'C',
            v: `C: ${res.item3}`
          })
        }
        if (res.item4) {
          optionsArr.push({
            k: 'D',
            v: `D: ${res.item4}`
          })
        }

        this.optionsArr = optionsArr
        this.answer = res.answer
        this.explains = res.explains
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
      this.bindCapture()
    },
    record () {
      clearInterval(this.countDownInterval)

      service.requestUrl({
        url: '/question/record',
        data: {
          correctNum: this.answerRight,
          wrongNum: this.answerWrong,
          costTime: this.timestampOld - this.timestamp
        }
      }).then(res => {
        this.showDialog = true
        // this.costTime = this.$parent.secondToDate(costTime).date
        // this.$router.push(`Result?correctNum=${this.answerRight}&wrongNum=${this.answerWrong}&costTime=${costTime}`)
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
      this.bindCapture()
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
      const that = this
      navigator.getUserMedia({
        video: true
      }, function (stream) {
        that.stream = stream
        video.src = window.URL.createObjectURL(stream)
        video.play()
      }, function () {
        alert('摄像头未启动，请联系管理员换机')
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
        canvas.getContext('2d').drawImage(
          video, 0, 0, videoWidth, videoHeight
        )
        let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        let base64Photo = image.split(',')[1]
        service.requestUrl({
          url: '/user/grabgraph',
          data: {
            type: 'question',
            base64Photo: base64Photo
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: 'warning'
          })
        })
      } else {
        setTimeout(this.bindCapture, 200)
      }
    },
    navback () {
      this.$router.push('/User/EducationRecord')
    }
  },
  beforeDestroy () {
    this.stream.getTracks()[0].stop()
  }
}
</script>

<style scoped>
  #canvas {
    display: none;
  }

  #video {
    width: 250px;
    height: 150px;
    margin-bottom: 40px;
    border: 1px #ddd solid;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #000000;
  }

  .container {
    text-align: left;
    height: calc(100% - 1px);
    border-top: 1px #f2f7f8 solid;
  }

  .container img {
    width: 100%;
  }

  #body {
    background-color: #fff;
    margin: 40px;
    padding: 20px 40px;
    height: calc(100% - 120px);
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

  .primary {
    color: #409EFF;
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

  .dialog {
    background: rgba(0, 0, 0, .3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
  }

  .dialogContainer {
    width: 350px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
    text-align: center;
  }

  .dialogContainer .dialogTitle {
    font-size: 20px;
    text-align: center;
    line-height: 80px;
  }

  .dialogContainer div {
    padding: 0 100px;
    text-align: left;
    line-height: 40px;
  }

  .dialogContainer .el-button {
    margin-top: 20px;
  }
</style>
