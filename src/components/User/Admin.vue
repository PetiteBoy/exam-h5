<template>
  <div class="container">
    <div class="crumbs">
      <div>当前位置</div>
      <div>我的信息 > 个人信息</div>
    </div>
    <el-row :gutter="20" v-for="(item, index) in userInfo" :key="index">
      <el-col :span="6">{{ item.k }}</el-col>
      <el-col :span="18" v-if="index !== 9">{{ item.v }}</el-col>
      <el-col :span="18" v-else>
        <img :src="item.v" alt="">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import service from '../../service/service.js'

export default {
  name: 'Admin',
  data () {
    return {
      dataIdType: {
        IDCARD: '居民身份证',
        OFFICER: '军官证',
        SOLDIER: '士兵证',
        RETIRED: '军官离退休证',
        OUTSIDE: '境外人员身份证',
        DIPLOMATIC: '外交人员身份证明'
      },
      userInfo: [{
        k: '真实姓名',
        v: ''
      }, {
        k: '手机号码',
        v: ''
      }, {
        k: '准驾车型',
        v: ''
      }, {
        k: '驾驶证号',
        v: ''
      }, {
        k: '驾驶证有效期',
        v: ''
      }, {
        k: '证件类型',
        v: ''
      }, {
        k: '证件号码',
        v: ''
      }, {
        k: '注册时间',
        v: ''
      }, {
        k: '审核时间',
        v: ''
      }, {
        k: '个人头像',
        v: ''
      }]
    }
  },
  mounted () {
    service.requestUrl({
      url: '/user/info'
    }).then(res => {
      console.log(res)
      this.userInfo[0].v = res.realname
      this.userInfo[1].v = res.phone
      this.userInfo[2].v = res.licenseType
      this.userInfo[3].v = res.licenseNo
      this.userInfo[4].v = `${this.time(res.licenseBeginDate)} 至 ${this.time(res.licenseEndDate)}`
      this.userInfo[5].v = this.dataIdType[res.idType]
      this.userInfo[6].v = res.idNo
      this.userInfo[7].v = this.time(res.createTime)
      this.userInfo[8].v = res.auditTime ? this.time(res.auditTime) : '-'
      this.userInfo[9].v = res.headUrl
    }).catch(err => {
      this.$message({
        showClose: true,
        message: err,
        type: 'warning'
      })
    })
  },
  methods: {
    time (timestamp) {
      const newDate = new Date()
      newDate.setTime(timestamp)
      return newDate.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
  .container .crumbs {
    border-bottom: 0;
    margin-bottom: 20px;
  }

  .crumbs div:first-child {
    color: #11A0F8;
    font-size: 18px;
  }

  .crumbs div:last-child {
    color: #54667A;
    font-size: 14px;
  }

  .container {
    text-align: left;
    background-color: #fff;
    margin: 0!important;
    padding: 20px;
  }

  .container .title {
    font-size: 24px;
    font-weight: bold;
  }

  .container > div {
    font-size: 18px;
    padding: 10px 0;
    border-bottom: 1px #E9F1F3 solid;
  }

  img {
    width: 25mm;
    height: 35mm;
  }
</style>
