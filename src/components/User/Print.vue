<template>
  <div class="container">
    <div class="print">
      <el-button type="primary" @click="print">打印</el-button>
      <div class="printBorder">
        <div id="print">
          <div class="printPadding">
            <div class="title">机动车驾驶人审验教育记录单（正面）</div>
            <div class="userInfo">
              <div>
                <div>姓名：{{ data.realname }}</div>
                <div>档案编号：{{ data.licenseNo }}</div>
              </div>
              <div>
                <div>准驾车型：{{ data.licenseType }}</div>
                <div>身份证号：{{ data.idNo }}</div>
              </div>
              <div>
                <img :src="data.headUrl">
              </div>
            </div>
            <div class="info ovh">
              <div>该驾驶人于 {{ data.createTime }} 参加了道路交通安全法律法规、交通安全文明驾驶、应急处置等知识学习和交通事故案例警示教育。</div>
              <div class="r">
                <div>市（县、区）公安机关</div>
                <div>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</div>
              </div>
            </div>
            <div class="notice ovh">
              <div class="title">参加审验教育须知</div>
              <div class="content">机动车驾驶人参加审验教育不得由他人替学，不得扰乱课堂纪律，不得迟到早退，违反相关规定者取消本次参加教育资格，另行预约参加教育。</div>
              <div class="r">驾驶人签字：</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../../service/service.js'

export default {
  name: 'Print',
  data () {
    return {
      id: '',
      data: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    service.requestUrl({
      url: `/user/edurecord/detail?id=${this.id}`,
      method: 'get'
    }).then(res => {
      res.createTime = this.formatDateTime(res.createTime)
      this.data = res
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    print () {
      const newstr = document.getElementById('print').innerHTML
      const oldstr = document.body.innerHTML
      document.body.innerHTML = newstr
      window.print()
      document.body.innerHTML = oldstr
      window.location.reload()
    },
    formatDateTime (timeStamp) {
      var date = new Date()
      date.setTime(timeStamp)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return `${y}年${m}月${d}日`
    }
  }
}
</script>

<style scoped>
  .print {
    height: 100%;
    color: #333;
    font-size: 14px;
    background-color: #fff;
    text-align: center;
    overflow-y: hidden;
  }

  .printBorder {
    transform-origin: 50% 5%;
    transform: scale(.75);
    max-width: 1000px;
    border: 1px #000 solid;
    margin: auto;
  }

  #print {
    padding: 100px;
  }

  .printPadding {
    padding: 50px 80px;
  }

  .el-button {
    margin-top: 20px;
  }

  .title {
    font-size: 22px;
    padding: 20px;
    text-align: center;
  }

  .userInfo {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }

  .userInfo > div {
    width: 300px;
    line-height: 38px;
  }

  .userInfo > div:first-child {
    width: 200px;
  }

  .userInfo > div:last-child {
    width: 100px;
  }

  .userInfo img {
    width: 25mm;
    height: 35mm;
  }

  .info {
    margin-top: 100px;
    text-align: left;
  }

  .info div {
    text-indent: 2em;
  }

  .info .r {
    padding-top: 150px;
    text-align: right;
    line-height: 60px;
  }

  .notice .title {
    text-align: center;
  }

  .notice div {
    text-align: left;
    text-indent: 2em;
  }

  .notice .r {
    margin-top: 100px;
    padding-right: 120px;
  }
</style>
