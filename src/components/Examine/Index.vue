<template>
  <div class="container">
    <div class="notice">
      <div>{{ notice.title ? notice.title : '公告' }}</div>
      <textarea disabled style="resize: none; width: 100%; height: calc(100% - 60px)" v-model="notice.content"></textarea>
    </div>
    <!--<div class="tools">-->
      <!--<el-button :span="8" type="danger">满分教育(敬请期待)</el-button>-->
      <!--<el-button type="success" @click="navigation('/Examine/Video/Notice')">审验教育</el-button>-->
      <!--<el-button type="primary" @click="navigation('/User/Admin')">个人信息</el-button>-->
    <!--</div>-->
  </div>
</template>

<script>
import service from '../../service/service.js'

export default {
  name: 'Index',
  data () {
    return {
      notice: ''
    }
  },
  mounted () {
    service.requestUrl({
      url: '/notice/find/global',
      method: 'get'
    }).then(res => {
      this.notice = res
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    navigation (res) {
      this.$router.push(res)
    }
  }
}
</script>

<style scoped>
  .notice {
    padding: 20px 40px;
    background-color: #fff;
    height: calc(100% - 40px);
  }

  .notice div {
    font-size: 28px;
    padding-bottom: 20px;
  }

  .notice textarea {
    text-align: left;
    border: 0;
    font-size: 18px;
    display: block;
    line-height: 36px;
    color: #54667A;
  }

  .tools {
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }

  .tools .el-button {
    width: 300px;
    line-height: 60px;
  }
</style>
