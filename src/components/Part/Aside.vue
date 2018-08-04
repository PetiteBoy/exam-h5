<template>
  <div class="aside">
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
      <el-menu-item index="1" @click="change">
        <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        <span slot="title">{{ isCollapse ? '展开' : '收起' }}</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">审验视频</span>
        </template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-menu-item index="2-4">选项4</el-menu-item>
        <el-menu-item index="2-5">选项5</el-menu-item>
        <el-menu-item index="2-6">选项6</el-menu-item>
        <el-menu-item index="2-7">选项7</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'Aside',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    change () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .aside {
    float: left;
    min-height: 100%;
    width: 200px;
    text-align: left;
  }
</style>
