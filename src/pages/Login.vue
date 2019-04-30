<!-- 登录注册 -->
<template>
    <div>
        <div class="container">
            <h1 class="loginTitle">
                <a href="#/">{{"Kangdi 的博客"}}</a>
            </h1>
            <!-- 登录注册 -->
            <div class="">
                <div v-if="login==1" class="loginBox">
                    <div class="lr-title">
                        <h1>登录后台</h1>    
                    </div>
                    
                    <el-input
                        type="email"
                        placeholder="邮箱"
                        v-model="email">
                    </el-input>
                    <el-alert
                        v-show="emailErr"
                        title="请输入邮箱"
                        type="error"
                        show-icon  
                        :closable="false">
                        <!-- closable不可关闭 -->
                    </el-alert>
                    <el-input
                            type="password"
                          placeholder="密码"
                           @keyup.enter.native="loginEnterFun"
                          v-model="password">
                    </el-input>
                    <el-alert
                        v-show="passwordErr"
                        title="请输入密码"
                        type="error"
                        show-icon  
                        :closable="false">
                    </el-alert>
                    <h3><a href="">忘记密码？</a></h3>
                    <div class="lr-btn tcolors-bg" @click="gotoHome">登录</div>
                    <div class="otherLogin" >
                        <!-- 其他登录方式 -->    
                    </div>
                </div>
    
            </div>

        </div>
    </div>
</template>

<script>
import {UserLogin} from '../utils/server.js'
    export default {
        name: 'Login',
        data() { //选项 / 数据
            return {
                username: '',//用户名
                email: '',//邮箱
                password: '',//密码
               
                login:1,//是否已经登录

                emailErr: false,//登录邮箱错误
                passwordErr: false,//的轮毂密码错误

                loginErr: false,//登录错误
                loginTitle:'用户名或密码错误',

            
            }
        },
        methods: { //事件处理器
            routeChange(){
                var that = this;
                that.login = that.$route.query.login==undefined?1:parseInt(that.$route.query.login);//获取传参的login
                that.urlstate = that.$route.query.urlstate==undefined?0:that.$route.query.urlstate;//获取传参的usrlstate状态码
                // console.log(that.login,that.urlstate);
                if(that.urlstate==0){
                    that.err2005 = false;
                    that.step = 1;
                }else if(that.urlstate=='urlInvalid'){
                    that.err2005 = true;
                    that.step = 2
                }else if(that.urlstate=='urlErr'){
                    that.err2005 = true;
                    that.step = 1;
                }
            },
            loginEnterFun(e){
                var keyCode = window.event? e.keyCode:e.which;
                // console.log('回车登录',keyCode,e);
                //回车事件
                if(keyCode == 13 ){
                    this.gotoHome();
                }
            },
            gotoHome(){//用户登录
                var that = this;
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
                var preg = /^(\w){6,12}$/;
                //账号
                if(reg.test(that.email)){
                    that.emailErr = false; //匹配到则不显示错误弹框
                }else{
                    that.emailErr = true;
                }
                //密码
                if(that.password&&preg.test(that.password)){
                    that.passwordErr = false;//匹配到则不显示错误弹框
                }else{
                    that.passwordErr = true;
                }
                if(!that.emailErr&&!that.passwordErr){ //当 账号和密码 都没进行  错误弹窗的时候
                    UserLogin(that.email,that.password,function(msg){
                        // console.log(msg);
                        if(msg.code==1010){//  登录成功
                        //保存登录信息到本地
                             localStorage.setItem('userInfo',JSON.stringify(msg.data));
                             localStorage.setItem('accessToken',msg.token);
                        //恢复跳转到登陆页面的那个页面 
                             if(localStorage.getItem('logUrl')){
                                 that.$router.push({path:localStorage.getItem('logUrl')});
                             }else{
                                 that.$router.push({path:'/'});
                             }

                        }else if(msg.code==2008||msg.code==2007){//邮箱或密码错误
                            that.loginErr = true;
                            that.loginTitle = '邮箱或密码错误';
                        }else{
                            that.loginErr = true;
                            that.loginTitle = '登录失败';
                        }
                    })
                }
            },
        },
        components: { //定义组件

        },
        watch: {
           // 如果路由有变化，会再次执行该方法
           '$route':'routeChange'
         },
        created() { //生命周期函数
            var that = this;
            that.routeChange();
        }
    }
</script>

<style>

/*登录注册标题*/
.loginTitle{
    text-align: center;
    font-size: 26px;
    padding-top:50px;
    margin-bottom: 20px;
}
.loginBox ,.registerBox{
    background: #fff;
    padding:40px;
    max-width:320px;
    margin:0 auto;
}
.loginBox{
    padding-bottom:0;
}
.lr-title{
    position: relative;
    height:32px;
    line-height: 32px;
    margin-bottom: 20px;
}
.lr-title h1{
    font-size: 24px;
    color:#666;
    font-weight: bold;
    /*width:50%;*/
}
.lr-title p{
    font-size: 12px;
    color:#999;
    position: absolute;
    right:0;
    top:0;
}
.lr-btn{
    color:#fff;
    text-align: center;
    letter-spacing: 5px;
    padding:8px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
}
.loginBox .el-input,.registerBox .el-input{
    margin-bottom: 20px;
}
.loginBox .el-alert ,.registerBox .el-alert{
    top:-18px;
    background-color: #888;
}
.loginBox .el-input input,.registerBox .el-input input{
    border-radius: 4px;
}
.loginBox h3,.registerBox h3{
    text-align: right;
    margin-bottom: 20px;
}
.loginBox h3 a,.registerBox h3 a{
    font-size: 13px;
    color:#999;
}
.loginBox .otherLogin{
    max-width:320px;
    padding:5px 30px ;
    background: #ddd;
    text-align: center;
    margin-left:-40px;
    margin-right: -40px;
    visibility: hidden;
}
.loginBox .otherLogin p{
    margin-bottom:20px;
    font-size: 16px;
}
.loginBox .otherLogin a i{
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    border-radius: 50%;
    color:#fff;
    margin: 0 10px;
}
.loginBox .otherLogin a i.fa-wechat{
    background: #7bc549;
}
.loginBox .otherLogin a i.fa-qq{
    background: #56b6e7;
}
.loginBox .otherLogin a i.fa-weibo{
    background: #ff763b;
}

/*登录成功*/
.registerSuc{
    padding: 40px;
    margin: 0 auto;
}
.registerSuc .sucIcon{
    text-align: center;
    margin-bottom: 30px;
    padding-left:60px;
}
.registerSuc .sucContent{
    line-height: 1.5;
    font-size: 15px;
    text-align: center;
}
.registerSuc .sucContent p{
    margin-top: 10px;
    font-size: 13px;
    color: #999;
}
.registerSuc .sucContent .lastbtn{
    display: inline-block;
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 5px;
    color:#fff;
    cursor: pointer;
}
.registerSuc .sucContent  .el-icon-close{
    fong-size: 13px;
}
</style>
