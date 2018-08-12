<template>
  <div class="container" id="container">
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="userId" label="用户ID" width="100"></el-table-column>
      <el-table-column prop="eduType" label="教育类型" width="100"></el-table-column>
      <el-table-column prop="eduPattern" label="教育模式"></el-table-column>
      <el-table-column prop="createTime" label="教育开始时间"></el-table-column>
      <el-table-column prop="eduPeriod" label="教育周期"></el-table-column>
      <el-table-column prop="isCompleted" label="完成状态"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" @click="navPrint(scope.row.id)">打印</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import service from '../../service/service.js'

export default {
  name: 'EducationRecord',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    service.requestUrl({
      url: '/user/edurecord',
      data: {}
    }).then(res => {
      const that = this
      res.list.map(function (v) {
        v.eduType = '审验教育'
        v.eduPattern = '网络教育'
        v.createTime = that.formatDateTime(v.createTime)
        v.eduPeriod = '1天'
        v.isCompleted = v.isCompleted ? '已完成' : '未完成'
      })
      this.list = res.list
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    navPrint (res) {
      this.$router.push(`/User/Print?id=${res}`)
    },
    formatDateTime (timeStamp) {
      var date = new Date()
      date.setTime(timeStamp)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return `${y}-${m}-${d} ${h}:${minute}:${second}`
    }
  }
}
</script>

<style scoped>
  .el-table {
    text-align: left;
  }
</style>
