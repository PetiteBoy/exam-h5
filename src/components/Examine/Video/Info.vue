<template>
  <div class="container">
    <div class="title">
      <i class="el-icon-arrow-left" style="cursor: pointer" @click="mediaTools('back')"></i>
      {{ mediaInfo.categoryName }}
    </div>
    <div class="info">
      <div class="video">
        <div class="videoTitle">{{ mediaInfo.name }}</div>
        <video id="videoInfo" @click="mediaTools('tools')" :src="mediaInfo.url" width="100%" height="390"></video>
        <div class="videoTools ovh">
          <img class="l" src="../../../assets/play.png" @click="mediaTools('tools')">
          <div class="videoDate l">{{ completeDuration }} / {{ duration }}</div>
          <img class="r" src="../../../assets/fullScreen.png" @click="mediaTools('full')">
          <div class="r ovh">
            <img class="l" src="../../../assets/voice.png">
            <div class="block r">
              <el-slider v-model="mediaVolume"  @change="mediaTools('voice')"></el-slider>
            </div>
          </div>
        </div>
        <img class="player" src="../../../assets/player.png">
      </div>
      <div class="content">
        <div>视频标题：{{ mediaInfo.name }}</div>
        <div>视频描述：{{ mediaInfo.introduction }}</div>
        <video id="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../../../service/service.js'

export default {
  name: 'VideoInfo',
  data () {
    return {
      id: 1,
      media: true,
      currentTime: 0,
      mediaVolume: 70,
      mediaInfo: '',
      recordInterval: '',
      completeDuration: '',
      duration: '',
      userName: '',
      stream: ''
    }
  },
  mounted () {
    this.getId()
    this.webRtc()
    this.record()

    const that = this
    const Media = document.getElementById('videoInfo')

    Media.currentTime = this.currentTime
    this.completeDuration = this.$parent.secondToDate(Media.currentTime).date

    Media.addEventListener('timeupdate', function () {
      that.completeDuration = that.$parent.secondToDate(Media.currentTime).date
    })
    Media.addEventListener('ended', function () {
      that.$parent.record({
        videoId: that.id,
        videoTm: Media.currentTime,
        isCompleted: true
      })

      that.$message({
        showClose: false,
        message: '视频已看完，3秒后返回',
        type: 'success'
      })

      setTimeout(function () {
        window.history.back()
      }, 3000)
    })
  },
  methods: {
    getId () {
      this.id = this.$route.query.id
      service.requestUrl({
        url: `/video/find-by-id?id=${this.$route.query.id}`,
        method: 'get'
      }).then(res => {
        this.mediaInfo = res
        this.currentTime = res.completedDuration || 0
        this.duration = this.$parent.secondToDate(res.duration).date
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
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
      }, function (error) {
        console.log(error.name || error)
      })
    },
    mediaTools (res) {
      const Media = document.getElementById('videoInfo')

      if (res === 'tools') {
        if (this.media) {
          Media.play()
        } else {
          Media.pause()
        }
        this.media = !this.media
      } else if (res === 'full') {
        Media.webkitRequestFullScreen()
      } else if (res === 'voice') {
        Media.volume = res / 100
      } else {
        window.history.back()
      }

      this.$parent.record({
        videoId: this.id,
        videoTm: Media.currentTime,
        isCompleted: false
      })
    },
    record () {
      const that = this
      const Media = document.getElementById('videoInfo')

      this.recordInterval = setInterval(function () {
        that.$parent.record({
          videoId: that.id,
          videoTm: Media.currentTime,
          isCompleted: false
        })
      }, 600000)
    }
  },
  beforeDestroy () {
    this.stream.getTracks()[0].stop()
    clearInterval(this.recordInterval)
  }
}
</script>

<style scoped>
  .el-slider__bar {
    background-color: #54667A;
  }

  .el-slider__button-wrapper {
    display: none;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 100px;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }

  .info > div {
    background-color: #fff;
  }

  .video {
    width: 700px;
    height: 500px;
  }

  .video img {
    width: 15px;
    height: 15px;
    margin-top: 10px;
    cursor: pointer;
  }

  .videoTitle {
    line-height: 60px;
    text-indent: 2em;
  }

  .videoTools {
    padding: 0 30px;
  }

  .content {
    width: 250px;
    padding: 24px 15px;
  }

  #video {
    width: 250px;
    height: 150px;
    border: 1px #ddd solid;
    background-color: #1b1b1b;
    margin-top: 20px;
  }

  .video .player {
    width: 115px;
    height: 115px;
    cursor: pointer;
    position: relative;
    top: -300px;
    left: 288px;
  }

  .container{
    text-align: left;
    padding-bottom: 40px;
  }

  .block {
    width: 200px;
    margin-right: 20px;
  }

  .videoDate {
    line-height: 40px;
    padding-left: 20px;
    font-size: 18px;
  }

  .ovh .l {
    line-height: 40px;
    padding-right: 20px;
  }

  video::-webkit-media-controls{
    display:none !important;
  }
</style>
