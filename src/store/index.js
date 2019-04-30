import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
  loading: false,
  UserList: [111,222,333], //用户列表
  themeObj: 0,//主题
  //themeObj.top_image   背景图片url
  //themeObj.center_smailimg  右侧图片
  //themeObj.autograph:"Write Less, Do More."*****头像下面个性签名
  //themeObj.head_portrait:'static/img/favicon.jpg' ****** 头像
  ////themeObj.user_start hi aimee
  //themeObj.bottom_img  底部图片
  
  aboutmeObj:'',//关于我的信息
  //aboutmeObj.image   关于我aboutme的图片
  //aboutmeObj.brief    关于我的自我介绍信息
  //
  host:"http://"+window.location.host+"/port/",//接口路径
  keywords:'',   //保存自己input中输入的关键字
  errorImg: 'this.onerror=null;this.src="' + require('../../static/img/tou.jpg') +'"'
}

export default new Vuex.Store({
    state,
})
