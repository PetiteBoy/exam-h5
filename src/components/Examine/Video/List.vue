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
          <div>今日至少学习{{ learnDuration }}小时，目前已经学习{{ completeDuration }}</div>
          <div>提示：请务必保证学习时长大于3小时，否则无法生成相应学习记录</div>
        </div>
      </div>
      <div class="taskList">
        <el-row :gutter="20" v-for="item in taskList" :key="item.categoryId">
          <el-col :span="12">{{ item.categoryName }}至少完整学习{{ item.learnNum }}个视频</el-col>
          <el-col :span="3" :class="item.status === 1 ? 'success' : item.status === 0 ? 'danger' : 'info'">{{ item.status === 1 ? '已完成' : item.status === 0 ? '未完成' : '不要求' }}
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="list">
      <div v-for="item in list" :key="item.id">
        <div class="listTitle">{{ item.name }}</div>
        <el-row class="listContent" v-for="(videoItem, index) in item.videos" :key="videoItem.id" :gutter="20" v-if="index % 4 === 0">
          <el-col :span="6" v-for="i in [0, 1, 2, 3]" :key="i" v-if="item.videos[i + index]">
            <img :src="item.videos[i + index].thumbUrl">
            <div class="listTips r" :style="item.videos[i + index].isCompleted ? '' : 'background-color: #F56C6C;'">{{ item.videos[i + index].isCompleted ? '已完成' : '未完成' }}</div>
            <el-row class="listTools" :gutter="10">
              <el-col :span="14">
                <div class="listInfo">
                  <div class="overwrap">{{ item.videos[i + index].id }}. {{ item.videos[i + index].name }}</div>
                  <div class="overwrap">{{ item.videos[i + index].date }}</div>
                </div>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" size="mini" style="width: 100%;" @click="navigation(item.videos[i + index].id)">
                  {{item.videos[i + index].completedDuration > 0 && item.videos[i + index].duration !== item.videos[i + index].completedDuration ? '继续观看' : '观看' }}
                </el-button>
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
      list: ''
    }
  },
  mounted () {
    service.requestUrl({
      url: '/video/learn-info',
      method: 'get'
    }).then(res => {
      const data = res.data
      this.learnDuration = this.$parent.secondToDate(data.data.learnDuration).hour
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

      console.log(taskList)
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
    navigation (res) {
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
    padding-bottom: 20px;
    border-bottom: 1px #ddd solid;
  }

  .listContent {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .listTips {
    position: relative;
    top: -28px;
    background-color: #67C23A;
    color: #fff;
    text-align: center;
    width: 60px;
  }

  .listTools {
    width: 100%;
    display: flex;
  }

  .listTools .el-col-10 {
    margin-top: 10px;
  }

  .list img {
    width: 100%;
    height: 150px;
  }
</style>
