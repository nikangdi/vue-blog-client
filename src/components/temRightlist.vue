<!-- 右侧固定导航栏 -->
<template>
    <div class="rightlistBox">
        <section ><!-- 第一个section为右侧第一个框，图片+名字+链接 -->
            <div class="r1-head">
                <img :src="this.$store.state.themeObj.center_smailimg?this.$store.state.themeObj.center_smailimg:'static/img/headtou.jpg'" >
                <h1>
                    <span>Kangdi&nbsp;&nbsp;&nbsp;</span>康迪
                </h1>
            </div>
            <div class="r1-body">
                <p>快来抓我呀？</p>
                <div class="catch-me" >
                    <!-- tooltip文字提示el -->
                    <div class="">  <!-- 第一排 -->
                        <el-tooltip  class="item"  content="Github" placement="top" >
                            <a  :href="catchMeObj.git" target="_blank" ><i class="fa fa-fw fa-github"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item"  content="QQ" placement="top">
                            <a  :href="catchMeObj.qq" target="_blank"><i class="fa fa-fw fa-qq"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item"  content="微博" placement="top">
                            <a :href="catchMeObj.sina" target="_blank"><i class="fa fa-fw fa-weibo"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" content="微信" placement="top">
                            <a :href="catchMeObj.wechat" target="_blank"><i class="fa fa-fw fa-wechat"></i></a>
                        </el-tooltip>
                    </div>
                    <div class=""><!-- 第二排 -->
                        <el-tooltip class="item"  content="CSDN" placement="top">
                            <a :href="catchMeObj.csdn" target="_blank"><i class="">C</i></a>
                        </el-tooltip>
                       
                        <el-tooltip class="item"  content="更多" placement="top">
                            <a href="#/Aboutme" ><i class="el-icon-more"></i></a>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </section>
        <!-- 第二个section   点赞 do you like me? -->
        <section :class="fixDo?'rs2 fixed':'rs2'" @click="lovemeFun">
            <!-- fixDo 用于控制 do you like me 模块是否fix定位置顶 -->
            <p>Do you like me?</p>
            <div>
                <i :class="loveme?'heart active':'heart'" ></i>
                <span>{{likeNum}}</span>
            </div>
        </section>
        <!-- 第三个section  -->
        <!-- <section></section> -->
        <!-- 第四个section   大家都在看  -->
        <section class="rs4">
            <h2 class="ui label">
                大家都在看&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h2>
            <ul>   
                <li v-for="(item,index) in browseList" :key="'browseList'+index">
                    <a :href="'#/DetailShare?aid='+item.id" target="_blank">{{item.title}}</a> —— {{item.browse_count}} 次围观
                </li>
            </ul>
        </section>
        <!-- 右侧上滑小图片 -->
        <div   :class="gotoTop?'toTop hidden':'toTop goTop hidden'" @click="toTopfun">
            <!-- gotoTop?显示出来：隐藏掉 -->
            <img :src="this.$store.state.themeObj.right_img?this.$store.state.themeObj.right_img:'static/img/long.png'" alt="">
        </div>
       
    </div>
</template>


<script>
import {ShowBrowseCount,showLikeData,GetLike} from '../utils/server.js'
    export default {
        data() { //选项 / 数据
            return {
                catchMeObj:{//  抓住我 中的 个人信息  不需要改变
                   
                        git:'https://gitee.com/qinlh',
                        qq: 'static/img/qinlh/qq.jpg',
                        sina: 'https://weibo.com/u/2313631533',
                        wechat: 'static/img/qinlh/wechat.jpg',
                        csdn: 'http://www.qinlinhui.cn',
                        job: 'http://qinlh.mangoya.cn/MyResume/'    
                },
                fixDo:false,  // <!-- fixDo ，状态 用于控制 do you like me 模块是否fix定位置顶 -->
                likeNum:0,//do you like me 点击量
                initLikeNum:0,//初始化喜欢数量
                loveme:false,//  控制心形点赞动画状态 ，的两个css  两个css的区别主要是position不同
                //  而动画对准的是bg-position
                //  所以此状态主要用于控制动画
                browseList:{},//  浏览量  {id,count,browse_count}
                

                gotoTop:false,//返回顶部  的 状态控制
                going:false,//是否正在执行上滑动作  的   状态控制
      
            }
        },
        methods: { //事件处理器
            lovemeFun(){   //do you love me  点击
                var that = this;
                if(!this.loveme){  //心形点赞状态为false时，即没加action这个class的时候
                    that.likeNum+=1;
                    GetLike(this.likeNum,function(){   //将改变后的likeNum存到服务器
                    })
                }
                this.loveme = true;
                var timer = setTimeout(function(){
                    that.loveme = false;
                    clearTimeout(timer);
                },3000)  //3000ms最合适
            },
            toTopfun(){  //上滑
                var that = this;
                this.gotoTop = false; 
                this.going = true;    //正在执行上滑动作
                var timer = setInterval(function(){
                      //获取滚动条距离顶部高度
                      var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                      var ispeed = Math.floor(-osTop / 7);
                      document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;  // 上滑
                      //到达顶部，清除定时器
                      if (osTop == 0) {  //到达顶部，清除定时器
                          that.going = false;
                        clearInterval(timer);
                        timer = null;
                      };
                },30);
            },
        },
        components: { //定义组件
        },
        created() { //生命周期函数
            var that = this;
            window.onscroll = function(){   //向上滚动一定距离时，那个右侧toTop出现
                 var t = document.documentElement.scrollTop || document.body.scrollTop; //获得滚动上去的距离
                // console.log(t);
                if(!that.going){  //不处于 正在上滑阶段  ，才可以进行 下面 的判断
                    if(t>600){
                        that.gotoTop = true;  //控制状态  显示出来
                    }else{
                        that.gotoTop = false;   //控制状态  隐藏掉
                    }
                }
                if(t>1200){
                    that.fixDo = true;
                }else{
                    that.fixDo = false;
                }

            }
            
            ShowBrowseCount(function(data){   //查询浏览量最多的10篇文章数据
                // console.log('浏览最多10文章数据',data);
                that.browseList = data;
            });
            
            showLikeData(function(data){// 查询并返回 网站心形点赞的总数
                that.likeNum = that.initLikeNum = data;
            })

        }
    }
</script>

<style lang="less">
.rightlistBox{    //rightList为整个右侧大盒子
    position: relative;
}
.rightlistBox section {     //右侧大盒子里面的 每个小盒子
    transition: all 0.2s linear;  //谁做动作给谁
    position: relative;
    background: #fff;
    padding:15px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.rightlistBox section:hover{   //每个右侧小盒子的动画
    transform: translate(0,-2px);
    box-shadow:0 15px 30px rgba(0,0,0,.1);
}
// ************************************************
// *********************r1-head**************************
.rightlistBox .r1-head{  
    text-align: center ;
    // border-radius: 5px 5px 0 0 ;
    position: relative;
    /*box-shadow: inset 0 -70px 100px -50px rgba(0,0,0,.5);*/
}
.rightlistBox .r1-head img{
    width:100%;
    min-height: 100px;
    vertical-align: bottom;
}
.rightlistBox .r1-head h1{
    position: absolute;
    bottom:3px;
    left:50%;
    margin:0 0 0 -65px;
    font-size: 20px;
    letter-spacing:0.5px;
    color:#fff;
    text-shadow: 1px 1px 1px rgba(0,0,0,.7);
    font-weight: 700;
    width:130px;  
}
.rightlistBox .r1-head h1 span{
    opacity: 0.5;
}
// ******************r1-body**********************************
.rightlistBox .r1-body p{
    font-size: 14px;
    margin:5px 0 8px 0;
    font-weight: 700;
    text-align: center;
}
.rightlistBox .r1-body .catch-me{
    text-align: center;
}
.rightlistBox .r1-body .catch-me a{
    display: inline-block;
    margin-bottom: 7px;
    position: relative;
    text-decoration: none;
}
.rightlistBox .r1-body .catch-me a:hover i{
    color:#fff;
    background: #F4692C;
}
.rightlistBox .r1-body .catch-me a i{
    display: inline-block;
    font-size: 18px;
    width:42px;
    height:42px;
    line-height: 42px;
    border-radius: 42px;
    color:rgba(0,0,0,0.5);
    background: rgba(0,0,0,0.1);
    transition: all 0.3s ease-in-out;
    font-style: normal;
    margin:0 3.2px;
}

/*************do you like me*******************/
.rightlistBox .rs2{
    /*padding:10px 0 4px 0;*/
    min-height: 100px;
}
.rightlistBox .rs2.fixed{
    position: fixed;
    top:40px;
    width:22%;
}
.rightlistBox .rs2 p{
    color:#DF2050;
    cursor: pointer;
    font-size: 20px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-top:10px;
    font-weight: 500;
}
.rightlistBox .rs2 div{
    color:#DF2050;
    cursor: pointer;
    text-align: center;
    font-size: 40px;
    position: absolute;
    width:100%;
    height:100px;
    line-height: 100px;
    left:0;
    top:30px;
}
.rightlistBox .rs2 div i.heart{
    display: inline-block;
    width: 100px;
    height: 100px;
    //位置
    text-align: center;
    margin-left: -20px;
    margin-top:-5px;
    //背景
    background: url(../../static/img/heart.png) no-repeat;
    background-position: 0 0;
    cursor: pointer;
    vertical-align: middle;

    -webkit-transition: background-position 1s steps(28);
    //步进函数将过渡时间分成大小相等的时间时隔来运行
    transition: background-position 1s steps(28);  //按照所给的背景图片进行切分的  动画对准的是bg-position
    -webkit-transition-duration: 0s;
    // 让过渡效果持续 0 秒
    transition-duration: 0s;
    
}
.rightlistBox .rs2 div i.heart:hover{
    transform: scale(1.15);
    -webkit-transform: scale(1.15);
}
.rightlistBox .rs2 div i.heart.active{
    -webkit-transition-duration: 1s;
        transition-duration: 1s;
        background-position: -2800px 0;
}
.rightlistBox .rs2 div span{
    margin-left: -30px;
}

/************大家都在看***************/
// rs4中的第一个ul 的class样式  ui label 为公共标签，在app.vue中
// 抽离出去做公共标签  是因为 文章列表 也会用到它

.rightlistBox .rs4 li{
    padding:8px 0;
    text-align: justify;  //文本两端对齐
}
.rightlistBox .rs4 li a{
    font-weight: 600;
}
.rightlistBox .rs4 li a:hover{
    color:#487993;
}


/*回到顶部*/
/*返回到顶部*/
.toTop{
    //显示出来
    position: fixed;
    right:40px;
    top:-150px;
    z-index: 99;
    width:70px;
    height:900px;
    transition: all .5s 0.3s ease-in-out;
    cursor: pointer;
}
.goTop{
    //隐藏掉
    top:-950px;
}
.toTop img,.toTophui img{
    width:100%;
    height:auto;
}
.toTophui{
    position: fixed;
    right:10px;
    bottom:80px;
    z-index: 99;
    width:120px;
    height:120px;
    transition: all .5s 0.3s ease-in-out;
    cursor: pointer;
    animation: toflow 2s ease-in-out infinite;
}
@keyframes toflow {
    0%{
        /*top:400px;*/
        transform: scale(0.95) translate(0,10px);
    }
    50%{
        /*top:410px;*/
        transform:scale(1) translate(0,0px);
    }
    100%{
        /*top:400px;*/
        transform:scale(0.95) translate(0,10px);
    }
}
.goTophui{
    bottom:120vh;
}
</style>
