<template>
  <div class="header">
    <span>name</span>
    <span>退出</span>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .header {
    height: 60px;
    background: #545c64;
    width: 100%;
    line-height: 60px;
    color: #ffffff;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .header span {
    cursor: pointer;
    margin-right: 15px;
  }

  .header span:hover {
    color: #dddddd;
  }
</style>
