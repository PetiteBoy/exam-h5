<template>
  <div class="container">
    <div class="task">
      <div class="taskHeader">
        <div>
          <div>当前位置</div>
          <div>{{ title }}</div>
        </div>
        <div>
          <div>今日时长：{{ completeDuration }}/{{ learnDuration }}</div>
        </div>
      </div>
      <div class="taskList">
        <el-row :gutter="20">
          <el-col :span="4">学习任务：</el-col>
        </el-row>
        <el-row :gutter="20" v-for="item in taskList" :key="item.categoryId">
          <el-col :span="1"><i :class="item.status === 1 ? 'el-icon-success' : item.status === 0 ? 'el-icon-error' : 'el-icon-info'"></i></el-col>
          <el-col :span="12">{{ item.categoryName }}（至少完整学习<span class="primary"> {{ item.learnNum }} </span>个视频）</el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px;">
          <el-col :span="4">课程需知：</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :offset="1" :span="20">1.请务必保证学习时长大于3小时，否则无法生成相应学习记录</el-col>
          <el-col :offset="1" :span="20">2.必须完成每个分类的视频学习任务后才可以进行习题测试</el-col>
        </el-row>
      </div>
    </div>
    <div class="list">
      <div class="listTitle">{{ title }}</div>
      <div class="listDesc">简介：{{ desc }}</div>
      <div class="listContainer" v-for="(item, index) in list" :key="item.id" :gutter="20" v-if="index % 3 === 0">
        <div v-for="i in [0, 1, 2]" :key="i" v-if="list[i + index]">
          <div class="listImg" @click="navigation(list[i + index].id)" :style="list[i + index].thumbUrl ? `background: url(${list[i + index].thumbUrl}) center no-repeat; background-size: cover;` : ''">
          </div>
          <div class="listTips l ovh">
            <div class="r">{{ list[i + index].date }}</div>
          </div>
          <div class="listTools">
            <div class="listInfo">
              <div class="name overwrap">{{ list[i + index].name }}</div>
              <div class="introduction" :title="list[i + index].introduction">{{ list[i + index].introduction }}</div>
              <div class="dateContainer">
                <div class="date">
                  <img src="../../../assets/date.png">
                  <span>观看至{{ list[i + index].endDate }}%</span>
                </div>
                <span>{{ list[i + index].completedDuration ? '已观看' : '未观看' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import { getSessionStorage } from '../../../utils/base.js'
import service from '../../../service/service.js'

export default {
  name: 'VideoList',
  data () {
    return {
      tips: '需完成下列任务才可进行答题',
      buttonType: 1,
      buttonContent: '进行试题测验',

      learnDuration: '',
      completeDuration: '',

      taskList: '',
      list: '',

      defaultListImg: '',
      title: '',
      desc: '',

      total: 0
    }
  },
  watch: {
    $route: function () {
      this.categoryId = this.$route.query.id
      this.init()
    }
  },
  mounted () {
    this.categoryId = this.$route.query.id
    this.init()

    service.requestUrl({
      url: '/video/learn-info',
      method: 'get'
    }).then(res => {
      this.learnDuration = this.$parent.secondToDate(res.learnDuration).date
      this.completeDuration = this.$parent.secondToDate(res.completeDuration).date
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })

    service.requestUrl({
      url: '/video/config/check/state',
      method: 'get'
    }).then(res => {
      const that = this
      res.map(function (v) {
        if (!v.learnNum) {
          v.status = -1
          return
        }

        if (v.learnNum === v.completeNum) {
          v.status = 1
        } else {
          v.status = 0
          that.buttonType = 0
        }
      })

      this.taskList = res
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    init () {
      this.title = getSessionStorage(`asideTitle${this.categoryId}`)
      this.desc = getSessionStorage(`asideDesc${this.categoryId}`)

      service.requestUrl({
        url: '/video/page',
        data: {
          categoryId: this.categoryId,
          pageNum: 1,
          pageSize: 3
        }
      }).then(res => {
        for (let item of res.list) {
          item.date = this.$parent.secondToDate(item.duration).date
          item.endDate = (item.completedDuration / item.duration).toFixed(2) * 100
        }

        this.list = res.list
        this.total = res.total
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    },
    showListTips (item) {
      this.$nextTick(function () {
        this.$set(item, 'active', true)
      })
    },
    hideListTips (item) {
      this.$set(item, 'active', false)
    },
    navigation (res) {
      if (res === 'examine') {
        this.$router.push('/Examine/Examine/Notice')
        return
      }
      if (res === 'forbid') return
      this.$router.push(`Info?id=${res}`)
    },
    handleCurrentChange (res) {
      service.requestUrl({
        url: '/video/page',
        data: {
          categoryId: this.categoryId,
          pageNum: res,
          pageSize: 3
        }
      }).then(res => {
        for (let item of res.list) {
          item.date = this.$parent.secondToDate(item.duration).date
          item.endDate = (item.completedDuration / item.duration).toFixed(2) * 100
        }

        this.list = res.list
        this.total = res.total
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
  #body .container {
    margin: 0;
  }

  .container {
    background-color: #fff;
    height: auto;
    padding: 20px;
  }

  .taskHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #ddd solid;
    padding-bottom: 20px;
    font-size: 18px;
  }

  .taskHeader > div:first-child {
    color: #11A0F8;
    text-align: left;
  }

  .taskHeader > div:first-child div:last-child{
    color: #54667A;
    font-size: 14px;
  }

  .taskHeader > div:last-child {
    text-align: right;
  }

  .taskList {
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 30px;
    border: 1px #e9f1f3 solid;
    padding: 15px;
  }

  .taskList .el-icon-success {
    color: #409EFF;
  }

  .taskList .el-icon-error {
    color: #f56c6c;
  }

  .taskList .el-icon-info {
    color: #909399;
  }

  .taskList .el-col-12 {
    font-size: 16px;
  }

  .taskList span {
    font-size: 24px;
  }

  .taskList .primary {
    color: #409EFF;
  }

  .taskList .success {
    color: #67C23A;
  }

  .taskList .danger {
    color: #F56C6C;
  }

  .taskList .info {
    color: #909399;
  }

  .list {
    text-align: left;
  }

  .listTitle {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 30px;
    padding-left: 15px;
  }

  .listDesc {
    font-size: 16px;
    border: 1px #e9f1f3 solid;
    line-height: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
  }

  .listContainer {
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .listContainer > div {
    width: 30%;
  }

  .listTips {
    position: relative;
    top: -34px;
    color: #fff;
    text-align: center;
    width: 100%;
    line-height: 20px;
    font-size: 12px;
  }

  .listTips div {
    padding-bottom: 15px;
    padding-right: 20px;
  }

  .listTools {
    display: flex;
    position: relative;
    top: -34px;
    padding: 10px;
    border-left: 1px #dee4e6 solid;
    border-right: 1px #dee4e6 solid;
    border-bottom: 1px #dee4e6 solid;
  }

  .listInfo {
    width: 100%;
  }

  .listInfo .name {
    font-size: 18px;
    font-weight: bold;
  }

  .listInfo .introduction {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 46px;
  }

  .dateContainer {
    display: flex;
    justify-content: space-between;
  }

  .listInfo .date {
    display: flex;
    align-items: center;
  }

  .listInfo .date img {
    margin-right: 8px;
  }

  .listImg {
    width: 100%;
    padding-bottom: 56.25%;
    overflow: hidden;
    vertical-align: middle;
    text-align: center;
    background: url("../../../assets/listImg.jpg") center no-repeat;
    background-size: cover;
  }

  .listImg:hover {
    cursor: pointer;
  }
</style>
