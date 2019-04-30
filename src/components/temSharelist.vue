<!-- 文章列表 -->
<template>
    <el-row class="sharelistBox">
        
        <!-- *************************************************** -->
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.create_time,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.create_time,'date')"></span>
            </span>
            <header>
                <h1>
                    <a :href="'#/DetailShare?aid='+item.id" target="_blank">
                        {{item.title}}
                    </a>
                </h1>
                <h2>
                    <i class="fa fa-fw fa-user"></i>发表于
                    <i class="fa fa-fw fa-clock-o"></i><span v-html="showInitDate(item.create_time,'all')">{{showInitDate(item.create_time,'all')}}</span> •
                    <i class="fa fa-fw fa-eye"></i>{{item.browse_count}} 次围观 •
                    <i class="fa fa-fw fa-comments"></i>活捉 {{item.comment_count}} 条 •
                    <span class="rateBox">
                        <i class="fa fa-fw fa-heart"></i>{{item.like_count?item.like_count:0}}点赞 
                        
                    </span>
                </h2>
                <div class="ui label">
                    <a :href="'#/Share?classId='+item.class_id">{{item.cate_name}}</a>
                </div>
            </header>
            <div class="article-content">
                <p style="text-indent:2em;" v-html="item.description">
                </p>
                <p  style="max-height:300px;overflow:hidden;text-align:center;">
                    <img :src="item.image" alt="" class="maxW">
                </p>
            </div>
            <div class="viewdetail">
                <a class="tcolors-bg" :href="'#/DetailShare?aid='+item.id" target="_blank">
                    阅读全文>>
                </a>
            </div>
        </el-col>
        <el-col class="viewmore">
            <a v-show="hasMore" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">点击加载更多</a>
            <a v-show="!hasMore" class="tcolors-bg" href="javascript:void(0);">暂无更多数据</a>
        </el-col>
    </el-row>
</template>

<script>
import {ShowArticleAll,ArtClassData,initDate} from '../utils/server.js'
    export default {
        name:'Share',
        data() { //选项 / 数据
            return {
                 artId:0,//列表中最后一篇文章的id
                classId:0,
                className:'',
                // sonclassList:'',//二级分类

                hasMore:true, //加载更多按钮的显示状态控制
                level:1,
                shareClass:[
                    {class_id:1,cate_name:'技术分享'},
                    {class_id:2,cate_name:'闲言碎语'},
                    {class_id:3,cate_name:'事件簿'},
                    {class_id:4,cate_name:'创作集'}
                ],
                queryClass:1,
                articleList:[],//文章列表[{id,title,create_time,class_id,cate_name,browse_count:浏览次数,comment_count：评论条数，like_count，collect_count，description},{}]
            }
        },

        methods: { 
            showInitDate(oldDate,full){
                // console.log(oldDate,full);
                return initDate(oldDate,full)
            },
            showSearchShowList(initpage){//展示数据
                var that = this;
                 that.classId = (that.$route.query.classId==undefined?0:parseInt(that.$route.query.classId));//获取传参的classId

                that.level = that.$route.name=="Home" ? 1 : 0; //level用于控制是主页显示 还是分类显示列表
                // console.log(that.classId);
                ArtClassData(function(msg){
                    // console.log(msg);
                    that.shareClass = msg; 
                })
                ArtClassData(function(msg){
                    // console.log(msg);
                    that.shareClass = msg;
                })
                //判断当前显示的分类名称 以及子分类
                for(var i=0;i<that.shareClass.length;i++){
                    if(that.classId==that.shareClass[i].class_id){
                        that.className = that.shareClass[i].cate_name;
                    }
                }
                ////是否要初始化 文章id为0开始 是否要初始化
                that.artId = initpage ? 0 : that.artId;
                //********************************************************************* */
                
                ShowArticleAll(that.artId,that.classId,that.level,(result)=>{
                    // console.log(result);
                    if(result.code==1001){
                        var msg = result.data;
                        if(msg.length>0&&msg.length<10){
                            that.hasMore = false
                        }else{
                            that.hasMore = true;
                        }
                        that.articleList = initpage ? msg : that.articleList.concat(msg);
                        that.artId = msg[msg.length-1].id;  //列表中最后一篇文章的id
                        // console.log(that.artId);
                    }else{
                        that.hasMore = false;
                        that.articleList = initpage ? [] : that.articleList;
                    }
                })
            },
            addMoreFun(){//查看更多
                this.showSearchShowList(false);
            },
            routeChange(){
                var that = this;
                this.showSearchShowList(true);
            }
        },
        components: { //定义组件

        },
        watch: {
           // 如果路由有变化，会再次执行该方法
           '$route':'routeChange',
        //    '$store.state.keywords':'routeChange'
         },
        created() { //生命周期函数
            // console.log(this.$route);
            var that = this;
            that.routeChange();
        }
    }
</script>

<style>
/*分享标题*/
.shareTitle{
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding:15px;
}
.shareclassTwo{
    width:100%;
}
.shareclassTwo li{
    display: inline-block;
}
.shareclassTwo li a{
    display: inline-block;
    padding:3px 7px;
    margin:5px 10px;
    color:#fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover{
    transform: translate(0,-3px);
    -webkit-transform: translate(0,-3px);
}
.shareclassTwo li a.active{
    background: #fff;
    color:#64609E;

}
/*文章列表*/
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
    }


    /*.sharelistBox .viewmore a:hover,.s-item .viewdetail a:hover{
        background: #48456C;
    }*/
</style>
