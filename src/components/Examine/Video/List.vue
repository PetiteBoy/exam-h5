<template>
  <div class="container">
    <div class="task">
      <div class="taskHeader">
        <div>
          <div>学习要求</div>
          <el-tooltip class="item" effect="dark" :content="tips" placement="right">
            <el-button :type="buttonType ? 'primary' : 'info'"
                       @click="navigation(buttonType ? 'examine' : 'forbid')">{{ buttonContent }}
            </el-button>
          </el-tooltip>
        </div>
        <div>
          <div>今日至少学习{{ learnDuration }}，目前已经学习{{ completeDuration }}</div>
          <div>提示：请务必保证学习时长大于3小时，否则无法生成相应学习记录</div>
        </div>
      </div>
      <div class="taskList">
        <el-row :gutter="20" v-for="item in taskList" :key="item.categoryId">
          <el-col :span="10">{{ item.categoryName }} <span :class="item.status === 1 ? 'success' : item.status === 0 ? 'danger' : 'info'">至少完整学习{{ item.learnNum }}个视频</span></el-col>
          <el-col :span="3" :class="item.status === 1 ? 'success' : item.status === 0 ? 'danger' : 'info'">{{ item.status === 1 ? '已完成' : item.status === 0 ? '未完成' : '无要求' }}
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="list">
      <div v-for="item in list" :key="item.id">
        <div class="listTitle">{{ item.name }}</div>
        <el-row class="listContent" v-for="(videoItem, index) in item.videos" :key="videoItem.id" :gutter="20" v-if="index % 4 === 0">
          <el-col :span="6" v-for="i in [0, 1, 2, 3]" :key="i" v-if="item.videos[i + index]">
            <div class="listImg" @mouseover="showListTips(item.videos[i + index])" @mouseout="hideListTips(item.videos[i + index])" @click="navigation(item.videos[i + index].id)" :style="item.videos[i + index].thumbUrl ? `background: url(${item.videos[i + index].thumbUrl}) center no-repeat;` : ''">
            </div>
            <div class="listTips l" style="background-color: rgba(0, 0, 0, .3)" v-if="item.videos[i + index].active">{{ item.videos[i + index].date }}</div>
            <div class="listTips l" v-else></div>
            <div class="listTips r" :style="item.videos[i + index].isCompleted ? 'background-color: #67C23A;' : 'background-color: #F56C6C;'" v-if="item.videos[i + index].active">{{ item.videos[i + index].isCompleted ? '已完成' : '未完成' }}</div>
            <div class="listTips r" v-else></div>
            <el-row class="listTools" :gutter="10">
              <el-col :span="24">
                <div class="listInfo">
                  <div class="name">{{ item.videos[i + index].name }}</div>
                  <div class="introduction" :title="item.videos[i + index].introduction">{{ item.videos[i + index].introduction }}</div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
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

      defaultListImg: ''
    }
  },
  mounted () {
    service.requestUrl({
      url: '/video/learn-info',
      method: 'get'
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
        this.$router.push('/')
      }
      this.learnDuration = this.$parent.secondToDate(data.data.learnDuration).date
      this.completeDuration = this.$parent.secondToDate(data.data.completeDuration).date
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
      if (res.data.data.status !== '0x0000') {
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'warning'
        })
      }
      if (res.data.data.status === '0x5002') {
        this.$router.push('/')
      }
      let taskList = res.data.data

      taskList.map(function (v, i) {
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

      this.taskList = taskList
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })

    service.requestUrl({
      url: '/category/video/all',
      method: 'get'
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
        this.$router.push('/')
      }

      for (let item of data.data) {
        for (let i in item.videos) {
          const date = this.$parent.secondToDate(item.videos[i].duration)
          item.videos[i].date = date.date
        }
      }
      this.list = data.data
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    showListTips (item) {
      this.$nextTick(function () {
        this.$set(item, 'active', true)
      })
    },
    hideListTips (item) {
      this.$set(item, 'active', false)
    },
    navigation (res) {
      console.log(res)
      if (res === 'examine') {
        this.$router.push('/Examine/Examine/Notice')
        return
      }

      if (res === 'forbid') return

      this.$router.push(`Info?id=${res}`)
    }
  }
}
</script>

<style scoped>
  .taskHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #ddd solid;
    padding-bottom: 20px;
  }

  .taskHeader > div:first-child div {
    font-size: 24px;
    line-height: 40px;
    display: inline-block;
    padding-right: 40px;
  }

  .taskHeader > div:last-child {
    text-align: right;
  }

  .taskList {
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 30px;
  }

  .taskList span {
    font-size: 12px;
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
    padding-bottom: 20px;
    border-bottom: 1px #ddd solid;
  }

  .listContent {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .listTips {
    position: relative;
    top: -17px;
    color: #fff;
    text-align: center;
    width: 50px;
    height: 17px;
    font-size: 12px;
  }

  .listTools {
    width: 100%;
    display: flex;
  }

  .listTools .el-col-10 {
    margin-top: 10px;
  }

  .listInfo .name {
    font-weight: bold;
  }

  .listInfo .introduction, .listInfo .date {
    color: #666;
    font-size: 12px;
  }

  .listInfo .introduction {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 54px;
  }

  .listImg {
    width: 100%;
    height: 176.25px;
    overflow: hidden;
    vertical-align: middle;
    text-align: center;
    background: url("../../../assets/listImg.jpg") center no-repeat;
  }

  .listImg:hover {
    cursor: pointer;
  }
</style>
