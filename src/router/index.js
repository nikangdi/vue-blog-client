import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../pages/Home.vue';
import Share from '../pages/Share.vue';
import DetailShare from '../pages/DetailShare.vue';
import Reward from '../pages/Reward.vue';
import Message from '../pages/Message.vue';
import Aboutme from '../pages/Aboutme.vue';
import Login from '../pages/Login.vue';
import UserInfo from '../pages/UserInfo.vue';


export default new VueRouter({
	scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
		//现在要求点击浏览器“前进/后退”按钮，页面滚动条要记录上一次的位置，这时需要设置它的的滚动行为。
		// savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
		if (savePosition) {
			return savePosition;//之前阅读的位置
		} else {
            var top;
            if (window.innerWidth >= 700) {   //区分手机端 和客户端
                 top = 676
            } else {
                 top = 267
            }
			return {x: 0,y: top}
		}
	},
	routes: [{
			path: '/',
			redirect: '/Home'
		}, //首页
		{
			path: '/Home',
			component: Home,
			meta: {
				auth: true,
				
			},
			name: 'Home'
		}, //首页
		{
			path: '/Share',
			component: Share,
			meta: {
				auth: true,
				title:'文章列表'
			},
			name: 'Share'
		}, //分类
		{
			path: '/DetailShare',
			component:DetailShare,
			meta: {
				auth: true,
				title:'详细页面'
			},
			name: 'DetailShare'
		}, //分享详情
		{
			path: '/Reward',
			component: Reward,
			meta: {
				auth: true,
				title:'赞赏'
			},
			name: 'Reward'
			
		}, //赞赏
		
		{
			path: '/Message',
			component: Message,
			meta: {
				auth: true,
				title:'留言板'
			},
			name: 'Message'
		}, //留言板
		{
			path: '/Aboutme',
			component: Aboutme,
			meta: {
				auth: true,
				title:'关于我'
			},
			name: 'Aboutme'
		}, //关于
		{
			path: '/Login',
			component:Login,
			meta: {
				auth: false,
				title:"后台登陆"
			},
			name: 'Login'
		}, //登录
		{
			path: '/UserInfo',
			component: UserInfo,
			meta: {
				auth: true,
				title:"个人中心"
			},
			name: 'UserInfo'
		}, //用户个人中心
		
	]
})
