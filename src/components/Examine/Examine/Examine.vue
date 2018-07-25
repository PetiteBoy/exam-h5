<template>
    <div class="container">
        <video id="video" class="r"></video>
        <div class="title">第{{ questionNum }}题/题目总数{{ total }} 倒计时 {{ time }}</div>
        <el-row :gutter="20">
            <el-col :span="img ? 18 : 24">{{ content }}</el-col>
            <el-col v-if="img" :span="6">
                <img :src="img">
            </el-col>
        </el-row>
        <el-radio-group v-model="radio" @change="answers" :disabled="finish">
            <el-radio class="radioItem" v-for="item in optionsArr" :label="item.k">{{ item.v }}</el-radio>
        </el-radio-group>
        <div v-if="finish">
            <div>正确答案：{{ answer }}</div>
            <div>{{ answerContent }}</div>
        </div>
        <el-button :type="finish ? 'primary' : 'info'">{{ questionNum < total ? '下一题' : '完成' }}</el-button>
    </div>
</template>

<script>
    export default {
        name: "Examine",
        data() {
            return {
                finish: false,
                questionNum: 1,
                total: 100,
                time: '00:45:00',
                img: 'http://images.30sbk.com/7369e9c6ce1f1942f13f2e0aeba37d3c_1.jpg',
                content: '常规就是前人的方法，就是之前的企业成功后总结出来的规则，作为一个后来者，想要生存甚至超越前人，用常规与人家竞争永远赢不了，必须打破常规、聪明工作，不断创新，才能让企业立于不败之地。拉卡拉董事长孙陶然先生近日在喜马拉雅亲自讲授企业管理兵法，将自己多年的管理经验分享给广大管理者及职场人士，其中，他就列举了两个小故事来讲如何打破常规、聪明工作，实现创新。',
                optionsArr: [{
                    k: 1,
                    v: 'A: 111'
                }, {
                    k: 2,
                    v: 'B: 常规就是前人的方法，就是之前的企业成功后总结出来的规则，作为一个后来者，想要生存甚至超越前人，用常规与人家竞争永远赢不了，必须打破常规、聪明工作，不断创新，才能让企业立于不败之地。拉卡拉董事长孙陶然先生近日在喜马拉雅亲自讲授企业管理兵法，将自己多年的管理经验分享给广大管理者及职场人士，其中，他就列举了两个小故事来讲如何打破常规、聪明工作，实现创新。'
                }, {
                    k: 3,
                    v: 'C: 333'
                }, {
                    k: 4,
                    v: 'D: 444'
                }],
                radio: '1',
                answer: 1,
                answerContent: '常规就是前人的方法，就是之前的企业成功后总结出来的规则，作为一个后来者，想要生存甚至超越前人，用常规与人家竞争永远赢不了，必须打破常规、聪明工作，不断创新，才能让企业立于不败之地。拉卡拉董事长孙陶然先生近日在喜马拉雅亲自讲授企业管理兵法，将自己多年的管理经验分享给广大管理者及职场人士，其中，他就列举了两个小故事来讲如何打破常规、聪明工作，实现创新。'
            }
        },
        mounted() {
            this.webRtc()
            this.bindCapture()
        },
        methods: {
            webRtc() {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                const video = document.getElementById('video');
                navigator.getUserMedia({
                    video: true
                }, function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, function (error) {
                    alert(error.name || error);
                });
            },

            bindCapture() {
                const videoWidth = video.videoWidth, videoHeight = video.videoHeight;
                if (videoWidth && videoHeight) {
                    const canvas = document.getElementById('canvas');
                    canvas.width = videoWidth;
                    canvas.height = videoHeight;
                    document.getElementById('capture').addEventListener(
                        'click',
                        function () {
                            console.log(video)
                            canvas.getContext('2d').drawImage(
                                video, 0, 0, videoWidth, videoHeight
                            );
                            image = canvas.toDataURL("image/png");
                            console.log(image);
                        },
                        false
                    );
                } else {
                    setTimeout(this.bindCapture, 200);
                }
            },

            answers(res) {
                this.finish = true
            }
        }
    }
</script>

<style scoped>
    #video{
        width: 300px;
        height: 200px;
        margin-bottom: 40px;
        border: 1px #ddd solid;
    }

    .container {
        text-align: left
    }

    .container img {
        width: 100%;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        line-height: 50px;
    }

    .radioItem {
        display: block;
        margin-left: 0;
        padding-bottom: 20px;
        line-height: 20px;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>
