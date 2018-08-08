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
    }
  }
}
</script>

<style>
  html, body {
    background-color: #f8f8f8;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #54667a;
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

  #body {
    width: 1000px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 15px;
    padding-top: 60px;
    padding-left: 200px;
  }
</style>
