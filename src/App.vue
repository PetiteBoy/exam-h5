<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { removeSessionStorage } from './utils/base.js'

export default {
  name: 'App',
  methods: {
    logout () {
      removeSessionStorage('authKey')
      this.$router.push('/login')
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
    }
  }
}
</script>

<style>
  html, body {
    background-color: #f2f7f8;
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #54667a;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .l {
    float: left;
  }

  .r {
    float: right;
  }

  .ovh {
    overflow: hidden
  }

  .overwrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  textarea {
    background-color: #fff;
  }
</style>
