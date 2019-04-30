<!-- 关于我 -->
<template>
    <div class="tcommonBox">
        <header>
            <h1>
                <a href="#/DetailShare" target="_blank">
                    About me
                </a>
            </h1>
        </header>
        <section>
            <p class="abc">
                <img :src="this.$store.state.aboutmeObj.image?this.$store.state.aboutmeObj.image:'static/img/maoto.png'" 
                onerror="this.onerror=null;this.src= 'static/img/maoto.png'" 
                class="aboutmeImg">
            </p>
            <hr>
            <br>
            <p v-html="this.$store.state.aboutmeObj.brief"></p>
            
        </section>
    </div>
</template>

<script>
    export default {
        data() { //选项 / 数据
            return {
            }
        },
        methods: { //事件处理器

        },
        components: { //定义组件

        },
        created() { //生命周期函数

        }
    }
</script>

<style>
.aboutmeImg{
    max-width:100%;
    /*height:300px;*/
}
.tcommonBox section .abc{
    text-align: center;
}
.tcommonBox p a{
    color:#01AAED!important;
}
.tcommonBox p a:hover{
    color:rgb(72,121,147)!important;
}
.tcommonBox p i{
    font-style: italic;
}
.tcommonBox p b{
    font-weight: bold;
}
</style>
