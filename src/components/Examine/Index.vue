<template>
    <div class="index-container">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>
    .index-container {
        width: 1000px;
        margin: 40px auto;
    }
</style>
