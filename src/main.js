import Vue from 'vue'
import App from './App'
import {fetch} from "./utils/fetch"

Vue.prototype.$fetch=fetch
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/read/main', 'pages/my/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '云书',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color:'#cdcdcd',
      selectedColor:'#1296db',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath:'/static/icon/shouyeo.png',
        selectedIconPath:'/static/icon/shouye.png'
      }, {
        pagePath: 'pages/read/main',
        text: '我的阅读',
        iconPath:'/static/icon/shuo.png',
        selectedIconPath:'/static/icon/shu.png'
      },
        {
          pagePath: 'pages/my/main',
          text: '个人中心',
          iconPath:'/static/icon/myo.png',
          selectedIconPath:'/static/icon/my.png'
        }]
    },
  }
}
