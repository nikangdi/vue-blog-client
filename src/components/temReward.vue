<!-- 赞赏模块 -->
<template>
    <div class="tRewardBox tcommonBox">
        <header>
            <h1>赞赏</h1>
        </header>
        <section>
            <div class="abc">
                <img src="static/img/timg.jpg"  class="maxW hhh" >
            </div>
            <hr>
            <h1>@赞赏说明：</h1>
            <p>若无特殊说明，赞赏之款项用于给我补充大脑（*/∇＼*）</p>
            <p>如果我给你带来过欢乐，或者对你有所帮助，欢迎赞赏支持:)</p>
            <p>有任何疑问请在下面留言。</p> 
            <hr>
            <h1>@赞赏方式：</h1>
            <el-row   :gutter="30"> <!-- 二维码 --> 
                
                <el-col  :span="12"   class="donate-item">
                    <div class="donate-tip">
                        <img :src="rewardData.wechat_image?rewardData.wechat_image:'static/img/tou.jpg'" :onerror="$store.state.errorImg">
                        <span>微信扫一扫，向我赞赏</span>
                    </div>
                </el-col>
                <el-col :span="12"  class="donate-item">
                    <div class="donate-tip">
                        <img :src="rewardData.alipay_image?rewardData.alipay_image:'static/img/tou.jpg'" :onerror="$store.state.errorImg">
                        <span>支付宝扫一扫，向我赞赏</span>
                    </div>
                </el-col>
            </el-row>
            <hr>
            <h1>@赞赏记录：</h1>
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="pay_time" label="日期" align="center" ></el-table-column>
                <el-table-column prop="name" label="赞赏人"  align="center"></el-table-column>
                <el-table-column prop="money" label="金额" align="center"></el-table-column>
          </el-table>
        </section>
    </div>
</template>

<script>
    import {AdmireData,initDate} from '../utils/server.js'
    export default {
        data() { //选项 / 数据
            return {
                rewardData:'',  // 赞赏二维码{wechat_image:地址字符串,alipay_image：地址字符串}
                tableData: [{ // 赞赏数据
                     pay_time: '2016-05-02',
                     name: '王小虎',
                     money: '555'
                   },]
            }
        },
        methods: { //事件处理器
            showInitDate(date,full){//时间处理
                return initDate(date,full)
            }
        },
        components: { //定义组件

        },
        created() { 
            var that = this;
            AdmireData(function(msg){//从服务器获取赞赏的数据
                // console.log(msg);
                that.tableData = msg.data;   
                //{ data: 赞赏二维码 {wechat_image:地址字符串,alipay_image：地址字符串},
                //  admire_code: [{ 赞赏数据pay_time: '2016-05-02', name: '王小虎',money: '555'},]
                // }
                that.rewardData = msg.admire_code; 
               
            })
        }
    }
</script>

<style>
.tRewardBox section{/* 图片下面的全部 */
    padding-bottom:20px;  
    
}
.tRewardBox .abc{/* 图片直属的div，让图片居中 */
    text-align: center;  
    
}
.tRewardBox .abc .hhh{ /* 图片的高度 */
    height: 400px;  
   
}
.tRewardBox section h1{
    margin: 15px 0;
    font-size: 25px;
    font-weight: 700;
    /*text-align: center;*/
    line-height: 30px;
}
.tRewardBox section p{
    margin:10px 0;
    line-height:24px;
}
.tRewardBox section hr{  
    /* hr是一个盒子模型，是一个block */
    background: #ccc;
    margin-bottom: 10px;
}


.tRewardBox .donate-item{  /* 两块el布局的横向 左边那个*/ 
    text-align: right; 
    /* 一个右边对齐 */
    color:#44b549;
}
.tRewardBox .donate-item:last-child{   /* 两块el布局的横向 右边那个*/ 
    text-align: left; 
    /* 一个左边对齐 */
    color:#00a0e9;
}
.tRewardBox .donate-item img{  
    width:100%;
    display: block; 
    /* 把其他的挤到下一行 */
    height:auto;
}
.tRewardBox .donate-item div{   /* 两个donate-tip */
    display: inline-block;
    width:150px;
    padding:0 6px;
    text-align: center;
    box-sizing: border-box;
}
.tRewardBox .donate-item div span{/* 描述微信扫一扫支付宝扫一扫 */
    display: inline-block;
    width:100%;
    margin: 10px 0;
    text-align: center;  
    
}
.tRewardBox .el-table__body-wrapper{
    overflow: hidden;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
    background: transparent;
}
</style>
