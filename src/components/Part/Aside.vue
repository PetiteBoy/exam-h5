<template>
  <div class="aside">
    <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" background-color="#f2f7f8" text-color="#000" active-text-color="#11a0f8" unique-opened>
      <el-submenu index="0">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </template>
        <el-menu-item class="overwrap" index="/Home" @click="navigation('/Home')">首页公告</el-menu-item>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">课程学习</span>
        </template>
        <el-menu-item class="overwrap" index="/Examine/Video/Notice" @click="navigation('/Examine/Video/Notice')">学习须知</el-menu-item>
        <el-menu-item class="overwrap" :index="`/Examine/Video/List?id=${item.id}`" v-for="item in list" :key="item.id" @click="navigation(`/Examine/Video/List?id=${item.id}`)">{{ item.name }}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">考题测试</span>
        </template>
        <el-menu-item class="overwrap" index="/Examine/Examine/Notice" @click="navigation('/Examine/Examine/Notice')">参加考试</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">我的信息</span>
        </template>
        <el-menu-item class="overwrap" index="/User/Admin" @click="navigation('/User/Admin')">个人信息</el-menu-item>
        <el-menu-item class="overwrap" index="/User/EducationRecord" @click="navigation('/User/EducationRecord')">教育记录</el-menu-item>
        <el-menu-item class="overwrap" index="/User/ExamRecord" @click="navigation('/User/ExamRecord')">考试记录</el-menu-item>
      </el-submenu>
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
  .el-submenu .el-menu-item {
    font-size: 12px;
    padding-right: 20px;
    padding-left: 55px!important;
    color: #777!important;
  }

  .el-submenu .el-menu-item.is-active {
    color: #409EFF!important;
  }

  .el-submenu .el-menu-item:hover {
    /*background-color: red!important;*/
  }

  .el-menu-vertical-demo {
    width: 249px;
    text-align: left;
    border-right: 0;
  }
</style>
