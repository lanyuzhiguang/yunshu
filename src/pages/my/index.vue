<template>
  <div><img src="/static/Spinner-1s-63px.svg" class="loading" v-show="loading">
    <div class="my" v-if="!loading">
      <button class="btn" @click="login">登录</button>
      <button class="btn" @click="getData">获取数据</button>
    </div>
  </div>
</template>

<script>
  import {login} from '@/utils/fetch.js'
  export default {
    data(){
      return{
        loading:false
      }
    },
    methods: {
      login() {
        login()
        // wx.login({
        //   success(res) {
        //     console.log(res);
        //     wx.request({
        //       url: 'https://m.yaojunrong.com/login',
        //       method: 'POST',
        //       header: {
        //         'Content-Type': 'application/json'
        //       },
        //       success(data) {
        //         console.log(data);
        //         console.log(data.header.Token);
        //         wx.setStorageSync('token', data.header.Token)
        //       }
        //     })
        //   }
        // })原生
      },
      getData() {
        this.$fetch.get('/readList',{},function(res) {
          console.log(res)
        })
        // let token = wx.getStorageSync('token')
        // wx.request({
        //   url: 'https://m.yaojunrong.com/readList',
        //   method: 'GET',
        //   header: {
        //     'Content-Type': 'application/json',
        //     token: token
        //   },
        //   success(data) {
        //     console.log(data);
        //   }
        //
        // })原生
      }
    }
  }
</script>

<style scoped>
  .my{
    padding: 10px;
  }
  .btn{
    margin-top: 20rpx;
    width: 300 rpx;
    height: 100 rpx;
  }
</style>
