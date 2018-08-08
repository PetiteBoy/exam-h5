<template>
  <div class="container">
    <Header class="head"></Header>
    <div id="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { removeSessionStorage } from '../utils/base.js'
import service from '../service/service.js'
import Header from './Part/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  data () {
    return {
      notice: '',
      userName: ''
    }
  },
  mounted () {

  },
  methods: {
    logout () {
      removeSessionStorage('authKey')
      this.$router.push('/')
    },
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
