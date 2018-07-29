<template>
  <div id="app">
    <router-view/>
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
    margin: 20px auto;
  }
</style>
