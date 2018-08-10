<template>
  <div class="aside">
    <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" background-color="#f2f7f8" text-color="#000" active-text-color="#11a0f8">
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
</template>

<script>
import { setSessionStorage } from '../../utils/base.js'
import service from '../../service/service.js'

export default {
  name: 'Aside',
  data () {
    return {
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

    this.getCategory()
  },
  methods: {
    navigation (res) {
      this.$router.push(res)
    },
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
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo {
    width: 199px;
    text-align: left;
  }
</style>
