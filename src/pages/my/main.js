import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1982D3',
    navigationBarTitleText: '我的文档',
    navigationBarTextStyle: 'light',
  }
}
