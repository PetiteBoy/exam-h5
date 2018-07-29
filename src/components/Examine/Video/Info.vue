<template>
  <div class="container">
    <video id="video" class="r"></video>
    <div class="title">{{ mediaInfo.categoryName }}</div>
    <div class="content">{{ mediaInfo.introduction }}</div>
    <video id="videoInfo"  :src="mediaInfo.url" width="100%" height="640"></video>
    <el-button class="l" type="primary" @click="mediaTools('tools')">{{ media ? '播放' : '暂停' }}</el-button>
    <div class="videoDate l">{{ completeDuration }} / {{ duration }}</div>
    <el-button class="r" type="success" @click="mediaTools('full')">全屏</el-button>
    <div class="r ovh">
      <div class="l">音量</div>
      <div class="block r">
        <el-slider v-model="mediaVolume" @change="mediaTools"></el-slider>
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
      duration: ''
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
        const data = res.data
        console.log(data)
        this.mediaInfo = data.data
        this.currentTime = data.data.completedDuration || 0
        this.duration = this.$parent.secondToDate(data.data.duration).date
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
      navigator.getUserMedia({
        video: true
      }, function (stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
      }, function (error) {
        alert(error.name || error)
      })
    },
    mediaTools (res) {
      const Media = document.getElementById('videoInfo')
      console.log(res)

      if (res === 'tools') {
        if (this.media) {
          Media.play()
        } else {
          Media.pause()
        }
        this.media = !this.media
      } else if (res === 'full') {
        Media.webkitRequestFullScreen()
      } else {
        Media.volume = res / 100
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
    clearInterval(this.recordInterval)
  }
}
</script>

<style scoped>
  #video {
    width: 300px;
    height: 200px;
    margin-bottom: 40px;
    border: 1px #ddd solid;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 100px;
  }

  .content {
    text-indent: 2em;
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
  }

  .ovh .l {
    line-height: 40px;
    padding-right: 20px;
  }

  video::-webkit-media-controls{
    display:none !important;
  }
</style>
