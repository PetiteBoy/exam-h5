<template>
  <div class="container">
    <div id="body">
      <div class="result">
        <div>考试结果</div>
        <el-row :gutter="20" v-for="(item, index) in list" :key="index">
          <el-col :offset="9" :span="3">{{ item.k }}</el-col>
          <el-col :span="3">{{ item.v }}</el-col>
        </el-row>
        <el-button type="primary" @click="navback">交卷</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      list: [{
        k: '考试用时',
        v: '00:12:34'
      }, {
        k: '答对',
        v: ''
      }, {
        k: '答错',
        v: ''
      }]
    }
  },
  mounted () {
    this.list[0].v = this.$route.query.costTime
    this.list[1].v = `${this.$route.query.correctNum}题`
    this.list[2].v = `${this.$route.query.wrongNum}题`

    window.addEventListener('popstate', function () {
      window.history.forward(1)
    }, false)
  },
  methods: {
    navback () {
      this.$parent.logout()
    }
  }
}
</script>

<style scoped>
  .result {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: auto;
    height: 300px;
  }

  .result > div:first-child {
    font-size: 24px;
    font-weight: bold;
    line-height: 50px;
  }

  .result div {
    line-height: 40px;
  }

  button {
    margin-top: 20px;
  }
</style>
