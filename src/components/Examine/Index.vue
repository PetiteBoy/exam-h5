<template>
  <div class="index-container">
    <router-view></router-view>
  </div>
</template>

<script>
import service from '../../service/service.js'

export default {
  name: 'Index',
  methods: {
    secondToDate (param) {
      const options = Number(param)
      const hour = parseInt(options / 3600) >= 10 ? parseInt(options / 3600) : `0${parseInt(options / 3600)}`
      const minute = parseInt(options % 3600 / 60) >= 10 ? parseInt(options % 3600 / 60) : `0${parseInt(options % 3600 / 60)}`
      const second = parseInt(options % 60) >= 10 ? parseInt(options % 60) : `0${parseInt(options % 60)}`
      const date = `${hour}:${minute}:${second}`

      return {
        date: date,
        hour: hour,
        minute: minute,
        second: second
      }
    },

    record (param) {
      const options = param
      const videoId = options.videoId
      const videoTm = parseInt(options.videoTm)
      const isCompleted = options.isCompleted

      service.requestUrl({
        url: '/video/record',
        data: {
          videoId: videoId,
          completedDuration: videoTm,
          isCompleted: isCompleted
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

</style>
