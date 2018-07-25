<template>
    <div class="container">
video info
    </div>
</template>

<script>
    export default {
        name: "VideoInfo",
        data() {
            return {
                id: 1,
            }
        },
        mounted() {
            this.getId()
        },
        methods: {
            getId() {
                this.id = this.$route.query.id
            }
        }
    }
</script>

<style scoped>

</style>
