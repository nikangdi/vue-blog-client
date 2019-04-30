<!-- 头部公用 -->
<template>
<div class="">
	<div :class="isHeaderHiden?'headBack headBack-hiden':'headBack'">
		<el-row class="container">
			<el-col :span="24">
				<!-- pc端导航 -->
				<div class="headBox">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
						<!-- 若此处default-active固定，则，当你刷新后会重新指向该固定处 ，我们要求刷新后不便，所以要保存-->
						<!-- default-active	当前激活菜单的 index -->
						<!-- router属性，是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
						<el-menu-item index="/Home"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>

						<el-submenu index="/Share">
							<template slot="title"><i class="fa fa-wa fa-archive"></i> 分类</template>
							<el-menu-item v-for="(item,index) in classListObj" :key="'class1'+index" :index="'/Share?classId='+item.class_id">{{item.cate_name}}</el-menu-item>
						
						<!--classListObject =  [{class_id,cate_name},{}] -->
						</el-submenu>

						<el-submenu      index="/Aboutme">
	<!-- 作品及文章列表 两个的 index路由的问题 -->
							<template slot="title"><i class="fa fa-wa fa-flask"></i> 作品</template>
							<el-menu-item v-for="(item,index) in projectList" :key="'class2'+index" index=""><a :href="item.nav_url" target="_blank">{{item.nav_name}}</a></el-menu-item>
						</el-submenu>                 
						<!--projectList=[{nav_url,nav_name}]  -->

						<el-menu-item index="/Reward"><i class="fa fa-wa fa-cny"></i> 赞赏</el-menu-item>
						
						<el-menu-item index="/Message"><i class="fa fa-wa fa-pencil"></i> 留言板</el-menu-item>

						<el-menu-item index="/Aboutme"><i class="fa fa-wa fa-vcard"></i> 关于</el-menu-item>


						<!-- <div  class="pcsearchbox">
							<i class="el-icon-search pcsearchicon"></i>
							<div class="pcsearchinput" :class="input?'hasSearched':''">
								<el-input placeholder="搜索" icon="search" v-model="input" :on-icon-click="searchEnterFun" @keyup.enter.native="searchEnterFun" @change="searchChangeFun">
								
								</el-input>
							</div>
						</div> -->
						<!-- 老的版本的原因 -->

						<div class="userInfo">
							<!-- 根据hasLogin保存登录状态切换  -->
							<div v-show="!haslogin" class="nologin">  
								<a href="javascript:void(0);" @click="loginFun">后台登录&nbsp;</a> 
							</div>
							<div v-show="haslogin" class="haslogin">
								<i class="fa fa-fw fa-user-circle userImg"></i>
								<ul class="haslogin-info">
									<li>
										<a href="#/UserInfo">个人中心</a>  
										<!-- 与router-link to=功能相同 -->
									</li>
									<li>
										<a href="javascript:void(0);" @click="userlogout">退出登录</a>
									</li>
								</ul>
							</div>
						</div>
					</el-menu>
				</div>
				<!-- 移动端导航 -->
				<div class="mobileBox">
					<div class="hideMenu">
						<i @click="pMenu=!pMenu" class="el-icon-menu"></i>
						<el-collapse-transition>
							<el-menu :default-active="activeIndex" class="mlistmenu" v-show="!pMenu" theme="dark" @open="handleOpen" @close="handleClose" :unique-opened="true" :router="true">
								<el-menu-item index="/Home"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>
								<el-submenu index="/Share">
									<template slot="title"><i class="fa fa-wa fa-archive"></i> 分类</template>
									<el-menu-item v-for="(item,index) in classListObj" :key="'class1'+index" :index="'/Share?classId='+item.class_id">{{item.cate_name}}</el-menu-item>
								</el-submenu>
								<el-submenu index="2">
									<template slot="title"><i class="fa fa-wa fa-flask"></i> 作品</template>
									<el-menu-item v-for="(item,index) in projectList" :key="'class2'+index" index=""><a :href="item.nav_url" target="_blank">{{item.nav_name}}</a></el-menu-item>
								</el-submenu>
								<el-menu-item index="/Reward"><i class="fa fa-wa fa-cny"></i> 赞赏</el-menu-item>
								<!-- <el-menu-item index="/Friendslink"><i class="fa fa-wa fa-users"></i> 伙伴</el-menu-item> -->
								<el-menu-item index="/Message"><i class="fa fa-wa fa-pencil"></i> 留言板</el-menu-item>
								<el-menu-item index="/Aboutme"><i class="fa fa-wa fa-vcard"></i> 关于</el-menu-item>
								<el-menu-item v-show="!haslogin" index="" @click="logoinFun(1)">后台登录</el-menu-item>
								<el-submenu v-show="haslogin" index="3">
									<template slot="title"><i class="fa fa-wa fa-user-circle-o"></i> 我的</template>
									<el-menu-item index="/UserInfo">个人中心</el-menu-item>
									<el-menu-item index="" @click="userlogout">退出登录</el-menu-item>
								</el-submenu>
							</el-menu>
						</el-collapse-transition>
						<!-- <div class="searchBox">
							<el-input placeholder="" icon="search" v-model="input" @keyup.enter.native="searchEnterFun" :on-icon-click="searchEnterFun" @change="searchChangeFun">
							</el-input>
						</div> -->
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
	<!-- header部分背景图片 -->
	<div class="headImgBox" :style="{backgroundImage:this.$store.state.themeObj.top_image?'url('+this.$store.state.themeObj.top_image+')':headBg}">
		<div class="scene"><!-- hi，Kangdi sigmar-one 字体部分   导入的文件-->
			<div><span id="luke"></span></div>
		</div>
		<div class="h-information">
			<a href="#/Aboutme">
					<!-- 头像部分 -->
                    <img :src="this.$store.state.themeObj.head_portrait?this.$store.state.themeObj.head_portrait:'static/img/favicon.jpg'" >
                </a>
			<h2 class="h-description">
				<!-- 个性签名部分 -->
                    <a href="#/Aboutme">
                        {{this.$store.state.themeObj.autograph?this.$store.state.themeObj.autograph:"Write Less, Do More."}}
                    </a>
                </h2>
		</div>
	</div>
</div>
</template>
<script>
import {   
	ArtClassData,   
	LoginOut,
	navMenList,
	changeTheme,
	AboutMeData
} from '../utils/server.js'//  axios

import {Typeit} from '../utils/plug.js'//打印机效果

export default {
	data() { //选项 / 数据
		return {
			headBg: 'url(static/img/header001.jpg)', //头部背景图
			activeIndex: '/Home', //当前选择的路由模块,当点击一个后，会改变activeIndex为相应的path，此时刷新便还固定在之前点击的那个上
			
			classListObj: [], //文章分类信息,      <!--classListObject =  [{class_id,cate_name},{}] -->

			projectList: [],//作品 列表    <!--projectList=[{nav_url,nav_name}]  -->

			// input: '', //input搜索框输入内容
			//若有输入，让input   visible显示出来   .hasSearched  样式

			haslogin: false, //是否已登录
			userInfo: {}, //用户信息
			
			

			// state: '', //icon点击状态
			pMenu: true, //手机端菜单打开
			// path:'',//当前打开页面的路径
			
			
			isHeaderHiden:false,//header透明
		}
	},

	watch: {

	},
	methods: { //事件处理器
		handleOpen(key, keyPath) { //Ele-ui 分组菜单打开
			// console.log(key, keyPath);
		},
		handleClose(key, keyPath) { //Ele-ui 分组菜单关闭
			// console.log(key, keyPath);
		},
		handleSelect(key, keyPath) { //Ele-ui pc菜单选择
			//    console.log(key, keyPath);
		},


		// searchChangeFun(e) { //input change 事件 ，清空输入文本框时，出发输入框的visibility样式，隐藏input
		// 	// console.log(e)  
		// 	if (this.input == '') {    //当输入框中的内容变为空时，即清空输入内容时  
		// 		this.$store.state.keywords = '';
		// 		this.$router.push({path:'/'});  //路由跳转回主页面
		// 	}
		// },
		// searchEnterFun(e) { //input 输入 enter
		// 	 var keyCode = window.event? e.keyCode:e.which;
		// 	// console.log('CLICK', this.input, keyCode)
        //     //  console.log('回车搜索',keyCode,e);
        //      if(this.input){                //input内容不为空
		// 		 this.$store.state.keywords = this.input;     //保存自己输入的关键字  ，
		// 		 //    此时input不为空激活了input输入框的的visibility显示样式
        //          this.$router.push({path:'/Share?keywords='+this.input});   //跳转路由到关键词路由
        //      }
		// },


		loginFun() {  //登陆事件
			// console.log(msg);
			localStorage.setItem('logUrl', this.$route.fullPath);  //保存当前页面的？？？？？？？？？？？？？？？
			// console.log(666,this.$router.currentRoute.fullPath); // fullPath匹配路由，path匹配路径
			
				this.$router.push({
					path: '/Login?login=1'
				});
		
		},
		// 用户退出登录！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！复杂
		userlogout: function() {
			var that = this;
			this.$confirm('是否确认退出?', '退出提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// console.log(that.$route.path);
				LoginOut(localStorage.getItem('accessToken'), function(result) {
					//    console.log(result);
					if (localStorage.getItem('userInfo')) {
						localStorage.removeItem('userInfo');
						that.haslogin = false;
						//    that.$router.replace({path:that.$route.fullPath});
						window.location.reload();
						that.$message({
							type: 'success',
							message: '退出成功!'
						});
					}
					if (that.$route.path == '/UserInfo') {
						that.$router.push({
							path: '/'
						});
					}
				})
			}).catch(() => {
				//
			});

		},
		routeChange() {
			var that = this;
			that.pMenu = true

			this.activeIndex = this.$route.path;//存一下 header导航栏的activeIndex的状态
			
			if (localStorage.getItem('userInfo')) { //获取本地缓存的用户信息！！！！！！！！！！！！！！！！！！！！！！如果有本地缓存
				that.haslogin = true;
				that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
				// console.log(that.userInfo);
			} else {
				that.haslogin = false;
			}
			ArtClassData(function(data) { //文章分类   ,axios
				// console.log(data);
				// 后台返回的数据data
				that.classListObj = data;
			})
			navMenList(function(data) { //作品项目列表获取
				// console.log('实验室',data);
				// data为服务器端返回的数据
				that.projectList = data;
			});
			if ((this.$route.name == "Share" || this.$route.name == "Home") && this.$store.state.keywords) {
				//关键词固定在搜索框里显示
				//实现的功能为  当    1   input提交搜索关键词后，会保存在$store中，
				//                   2   此时若切换路由 至  Share或Home  搜索框会一直保持固定在这个位置
				//   不符合上述两个条件     $store中存 的input 会清空，出发搜索框隐藏条件
				this.input = this.$store.state.keywords;
			} else {
				this.input = '';
				this.$store.state.keywords = '';  
			}
		},
		
	},
	components: { //定义组件

	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		'$route': 'routeChange',

	},
		
	
	created() { 
		
		//判断当前页面是否被隐藏
		var that = this;
		var hiddenProperty = 'hidden' in document ? 'hidden' :
			'webkitHidden' in document ? 'webkitHidden' :
			'mozHidden' in document ? 'mozHidden' :
			null;
		
		this.routeChange();

		//设置主题
		changeTheme(function(data) {
			// console.log(msg);
			that.$store.state.themeObj = data;

			// console.log('主题',that.$store.state.themeObj );
		});
		//关于我的信息
		AboutMeData(function(data) {
			// console.log('关于我',msg);
			that.$store.state.aboutmeObj = data
		});
		
        // window.onscroll = function(){
        //     var t = document.documentElement.scrollTop || document.body.scrollTop;
           
        //     if(t>650){
		// 		that.isHeaderHiden =false;
			
        //     }else{
		// 		that.isHeaderHiden =true ;
		// 	}
        // }
	},
	mounted() { //页面元素加载完成
		// plug.js中调整
		var that = this;
		// that.isHeaderHiden =true;
		var timer = setTimeout(function() {
			Typeit("this.$store.state.themeObj.user_start","#luke"); //打字机效果
			clearTimeout(timer);
		}, 500);
	}
}
</script>
<style lang="scss">

	.headBack-hiden{	
	background: rgba(40, 42, 44, 0)!important;
	.headBox li.is-active {
	/*background: #48456C;*/
			background:  rgba(40, 42, 44, 0.7)!important;
		}
		.headBox>ul li.el-menu-item:hover,
		.headBox>ul li.el-submenu:hover .el-submenu__title {
			background:  rgba(40, 42, 44, 0.7)!important;
		}

		.headBox>ul .el-submenu .el-menu,
		.headBox>ul .el-submenu .el-menu .el-menu-item {
			background: rgba(40, 42, 44, 0.7)!important;
		}
		.headBox>ul .el-submenu .el-menu .el-menu-item:hover {
			background:rgba(40, 42, 44, 0.7)!important;
		}
		.headBox .userInfo a:hover {
			color: rgb(40, 42, 44)!important;
		}
	}
</style>


<style>
 /*********头部导航栏********/

/*头部导航栏盒子*/

.headBack {
	width: 100%;
	background: rgba(40, 42, 44, 0.5);
	/*margin-bottom:30px;*/
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 100;
}

.headBox li.is-active {
	/*background: #48456C;*/
	background: rgba(72,121,147, 0.7);
}

.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
	border-bottom: none!important;
}

.headBox .el-menu {
	background: transparent;
	border-bottom: none!important;
}

.headBox .el-menu-demo li.el-menu-item,
.headBox .el-menu--horizontal .el-submenu .el-submenu__title {
	height: 38px;
	line-height: 38px;
	border-bottom: none!important;

}

.headBox .el-submenu li.el-menu-item {
	height: 38px;
	line-height: 38px;
}

.headBox li .fa-wa {
	vertical-align: baseline;
}

.headBox ul li.el-menu-item,
.headBox ul li.el-menu-item.is-active,
.headBox ul li.el-menu-item:hover,
.headBox .el-submenu div.el-submenu__title,
.headBox .el-submenu__title i.el-submenu__icon-arrow {
	color: #fff;
}

.headBox .el-menu--horizontal .el-submenu>.el-menu {
	top: 38px;
	border: none;
	padding: 0;
}

.headBox>ul li.el-menu-item:hover,
.headBox>ul li.el-submenu:hover .el-submenu__title {
	background: rgba(72,121,147, 0.7);
	border-bottom: none;
}

.headBox>ul .el-submenu .el-menu,
.headBox>ul .el-submenu .el-menu .el-menu-item {
	background: rgba(72,121,147, 0.7);
}

.headBox>ul .el-submenu .el-menu .el-menu-item {
	min-width: 0;
}

.headBox>ul .el-submenu .el-menu .el-menu-item:hover {
	background: rgba(72,121,147, 0.7);
}

/*pc搜索框盒子*/
/* .headBox .pcsearchbox {
	padding: 0;
	max-width: 170px;
	
	height: 100%;
	line-height: 38px;
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
} */
/* 搜索框input框 */
/* .headBox .pcsearchbox .pcsearchinput {
	width: 180px;
	padding: 10px 20px 10px 20px;
	background: rgba(40, 42, 44, 0.6);
	border-radius: 0 0 2px 2px;
	position: absolute;
	right: 0;
	top: 38px;
	opacity: 0;
	visibility: hidden; 
	隐藏起来 
	
	transform-origin: right;
	transition: all 0.3s ease-out;
} */
/* .headBox .pcsearchbox:hover .pcsearchinput {
	opacity: 1;
	
	visibility: visible;
} */

/* .headBox .pcsearchbox i.pcsearchicon {
	color: #fff;
	padding-left: 10px;
} */


/* .headBox .pcsearchbox .hasSearched {
	opacity: 1;
	visibility: visible;
} */
/* 
.headBox .pcsearchbox .el-input {
	width: 100%;
} */

/* .headBox .el-input__inner {
	height: 30px;
	border: none;
	background: #fff;

	border-radius: 2px;
	padding-right: 10px;
} */

.headBox .userInfo {
	height: 100%;
	line-height: 38px;
	position: absolute;
	right: 30px;
	top: 0;
	color: #fff;
}

.headBox .userInfo a {
	color: #fff;
	font-size: 13px;
	transition: all 0.2s ease-out;
}

.headBox .userInfo a:hover {
	color: rgb(72,121,147);
}

.headBox .nologin {
	text-align: right;
}

.headBox .haslogin {
	text-align: right;
	position: relative;
	min-width: 80px;
	cursor: pointer;
}

.headBox .haslogin:hover ul {
	visibility: visible;
	opacity: 1;
}

.headBox .haslogin ul {
	background: rgba(40, 42, 44, 0.6);
	padding: 5px 10px;
	position: absolute;
	right: 0;
	visibility: hidden;
	opacity: 0;
	transition: all 0.3s ease-out;
}

.headBox .haslogin ul li {
	border-bottom: 1px solid #48456C;
}

.headBox .haslogin ul li:last-child {
	border-bottom: 1px solid transparent;
}

/*******移动端*******/

.mobileBox {
	position: relative;
	height: 38px;
	line-height: 38px;
	color: #fff;
}

.hideMenu {
	position: relative;
	width: 100%;
	height: 100%;
	line-height: 38px;
}

.hideMenu ul.mlistmenu {
	width: 100%;
	position: absolute;
	left: 0;
	top: 100%;
	box-sizing: border-box;
	z-index: 999;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
	background: #48456C;
	color: #fff;
	border-right: none;
}

.hideMenu .el-submenu .el-menu {
	background: #64609E;
}

.hideMenu .el-menu-item,
.hideMenu .el-submenu__title {
	color: #fff;
}

.hideMenu>i {
	position: absolute;
	left: 10px;
	top: 12px;
	width: 30px;
	height: 30px;
	font-size: 16px;
	color: #fff;
	cursor: pointer;
}

.hideMenu .el-menu-item,
.el-submenu__title {
	height: 40px;
	line-height: 40px;
}

/* .mobileBox .searchBox {
	padding-left: 40px;
	width: 100%;
	box-sizing: border-box;
} */

/* .mobileBox .searchBox .el-input__inner {
	display: block;
	border-radius: 2px;
	border: none;
	height: 25px;
} */

.hideMenu ul.mlistmenu.pshow {
	display: block;
}

.hideMenu ul.mlistmenu .el-submenu__icon-arrow,
.mobileBox li.el-menu-item a {
	color: #fff;
}

.hideMenu>ul li.el-menu-item:hover,
.hideMenu>ul li.el-menu-item.is-active {
	background: #48576a;
}



/*头部背景图*/

.headImgBox {
	height: 650px;
	position: relative;
	width: 100%;
	background-size: cover;
	background-position: center 50%;
	background-repeat: no-repeat;
	margin-bottom: 90px;
}

/* 头像及个性签名部分 */
.h-information {
	text-align: center;
	width: 70%;
	margin: auto;
	position: relative;
	top: 480px;
	padding: 40px 0;
	font-size: 16px;
	opacity: 0.98;
	background: rgba(230, 244, 249, 0.7);
	border-radius: 10px;
	z-index: 1;
	animation: b 1s ease-out;
	-webkit-animation: b 1s ease-out;
}

@-webkit-keyframes b {
	0% {
		-webkit-transform: translateY(90px);
		transform: translateY(90px);
	}
	70% {
		-webkit-transform: translateY(5px);
		transform: translateY(5px)
	}
	90% {
		-webkit-transform: translateY(-10px);
		transform: translateY(-10px)
	}
	to {
		-webkit-transform: translateY(0);
		transform: translateY(0)
	}
}

@keyframes b {
	0% {
		-webkit-transform: translateY(90px);
		transform: translateY(90px);
	}
	70% {
		-webkit-transform: translateY(5px);
		transform: translateY(5px)
	}
	90% {
		-webkit-transform: translateY(-10px);
		transform: translateY(-10px)
	}
	to {
		-webkit-transform: translateY(0);
		transform: translateY(0)
	}
}
/* 头像部分 */
.h-information img {
	width: 100px;
	height: 100px;
	border-radius: 100%;
	transition: all .4s ease-in-out;
	-webkit-transition: all .4s ease-in-out;

	/* 解决图片变形问题,如果使用此方法，兼容各大浏览器不变形，但图片不是完整显示的 */
	object-fit: cover; 
	
}
.h-information img:hover {
	transform: scale(1.3);
	-webkit-transform: scale(1.3);
}


.h-information h2 {
	margin-top: 20px;
	font-size: 18px;
	font-weight: 700;
	/* font-family: 'Sigmar One'; */
}
.h-information h2  a{
	background: linear-gradient(to right, #DF2050, #48456D);
	-webkit-background-clip: text;
	color: transparent;
}

/* sigmar-one字体 */
.headImgBox .scene {
	width: 100%;
	/*height:300px;*/
	text-align: center;
	font-size: 100px;
	font-weight: 200;
	color: #fff;
	position: absolute;
	left: 0;
	top: 160px;
	font-family: 'Sigmar One', Arial;
	text-shadow: 0 2px 2px #47456d;

}

.headImgBox .scene span {
	/* transform 相对比较难理解的是 2D 的集合 matrix 。 
	这里只是对 matrix 里面的元素进行分解 
	matrix( 1 , 0 , 0 , 1 , 0 , 0 ) 
	1 2 3 4 5 6 
	1. 正常值为1，定义的是 scaleX 通过设置 X 轴的值来定义缩放。值：>=0 
	2. 正常值为0，定义的是 skew 定义 2D 倾斜 
	3. 正常值为0，定义的是 rotate 定义2D 旋转角度 
	4. 正常值为1，定义的是 scaleY 通过设置 Y 轴的值来定义缩放。值：>=0 
	5. 正常值为0，定义的是 translateX 通过设置 X 轴的值来定义左右位移。值：任意 
	6. 正常值为0，定义的是 translateY 通过设置 Y 轴的值来定义上下位移。值：任意
	 */
	/* font-family: 'Sigmar One', Arial; */
	transform: matrix(1, 0, 0, 1, 0, 0);
	-webkit-transform: matrix(1, 0, 0, 1, 0, 0);
	text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}

.saying:after {
	content: "|";
	font-family: Arial, sans-serif;
	font-size: 1em;
	/*line-height: 0;*/
	display: inline-block;
	vertical-align: baseline;
	opacity: 1;
	text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
	animation: caret 500ms infinite;
}

@keyframes caret {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
</style>
