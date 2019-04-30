<!-- 留言模块 -->
<template>
    <div class="tMSGbox tcommonBox">
        <header>
            <h1>
                <a href="#/DetailShare" target="_blank">
                    留言板
                </a>
            </h1>
        </header>
        <section>
            <h2>走过路过不要错过！跟我来唠一唠！</h2>
            <div class='abc'>
                <img :src="imgUrl" class="maxW hhh" >
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data() { //选项 / 数据
            return {
                imgUrl:"static/img/timg.jpg",

            }
        },
        methods: { //事件处理器

        },
        watch: {

         },
        components: { //定义组件

        },
        created() { //生命周期函数

        }
    }
</script>

<style>
    .tMSGbox section h2{
        font-weight: bold;
        line-height: 24px;
        font-size:20px;
    }
    .tMSGbox section div{
        margin:15px 0;
    }
    .tMSGbox section .abc{
        text-align:center;
    }
    .tMSGbox section .abc .hhh{
        height:400px;
    }

</style>
