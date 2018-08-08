<template>
  <div class="part">
    <div class="header">
      <span class="l">在线学习考试</span>
      <span class="l" @click="change"><i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i></span>
      <span>{{ userName }}</span>
      <span @click="logout()">注销</span>
    </div>
    <div class="aside">
      <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" background-color="#f2f7f8" text-color="#000" active-text-color="#11a0f8" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">审验视频</span>
          </template>
          <el-menu-item class="overwrap" index="/Examine/Video/Notice" @click="navigation('/Examine/Video/Notice')">视频公告</el-menu-item>
          <el-menu-item class="overwrap" :index="`/Examine/Video/List?id=${item.id}`" v-for="item in list" :key="item.id" @click="navigation(`/Examine/Video/List?id=${item.id}`)">{{ item.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item index="/Examine/Examine/Notice" @click="navigation('/Examine/Examine/Notice')">
          <i class="el-icon-menu"></i>
          <span slot="title">考试测试</span>
        </el-menu-item>
        <el-menu-item index="/User/Admin" @click="navigation('/User/Admin')">
          <i class="el-icon-menu"></i>
          <span slot="title">我的信息</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { removeSessionStorage, setSessionStorage } from '../../utils/base.js'
import service from '../../service/service.js'

export default {
  name: 'Header',
  data () {
    return {
      userName: '',
      isCollapse: false,
      list: [],
      defaultActive: ''
    }
  },
  watch: {
    $route: function () {
      this.defaultActive = this.$route.fullPath
    }
  },
  mounted () {
    this.defaultActive = this.$route.fullPath

    this.getUserInfo()
    this.getCategory()
  },
  methods: {
    getCategory () {
      service.requestUrl({
        url: '/category/video'
      }).then(res => {
        res.map(function (v) {
          setSessionStorage(`asideTitle${v.id}`, v.name)
          setSessionStorage(`asideDesc${v.id}`, v.introduction)
        })
        this.list = res
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    },
    navigation (res) {
      this.$router.push(res)
    },
    change () {
      this.isCollapse = !this.isCollapse
    },
    getUserInfo () {
      service.requestUrl({
        url: '/user/info'
      }).then(res => {
        this.userName = res.phone
      }).catch(err => {
        this.$message({
          showClose: true,
          message: err,
          type: 'warning'
        })
      })
    },
    logout () {
      removeSessionStorage('authKey')
      this.$router.push('/login')
    },
    returnBack () {
      this.$router.push('/Home')
    }
  }
}
</script>

<style scoped>
  .el-menu-item {
    padding-right: 20px;
  }

  .part {
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .aside {
    z-index: 10;
    min-height: 100%;
    width: 200px;
    text-align: left;
  }

  .header {
    height: 60px;
    width: 100%;
    line-height: 60px;
    color: #54667a;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    background-color: #fff;
  }

  .header span:first-child {
    background-color: #f2f7f8;
    display: inline-block;
    width: 200px;
    margin: 0;
    border-right: solid 1px #e6e6e6;
    text-align: center;
  }

  .header span {
    cursor: pointer;
    margin-left: 15px;
    margin-right: 15px;
  }

  .header span:hover {
    color: #333;
  }
</style>
