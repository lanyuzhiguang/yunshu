<template>
  <div class="my-contaner">
    <img src="/static/Spinner-1s-63px.svg" class="loading" v-show="loading">
   <div v-if="!loading">
    <div class="my" >
      <div class="content">
         <div class="message">
           <div class="message-imgs">
             <open-data type="userAvatarUrl" class="open-data"></open-data>
           </div>
           <div class="message-name">
            <open-data type="userNickName"></open-data>
           </div>
         </div>
        <div class="myall">
          <div class="one" >
            <div class="num">{{bookarr.length}}</div>
            <div class="numname">
              收藏
            </div>
          </div>
          <div class="one" >
            <div class="num">{{lookarr.length}}</div>
            <div class="numname">
              已看
            </div>
          </div>
          <div class="one" >
            <div class="num">0</div>
            <div class="numname">
              粉丝
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nothing">
      <img src="/static/icon/saosao.png" class="nothing-img">
      <img src="/static/icon/wendang.png" class="nothing-img" @click="handlecollect">
      <img src="/static/icon/jianyi.png" class="nothing-img">
      <img src="/static/icon/look.png" class="nothing-img" @click="handlelook">
      <img src="/static/icon/qianbao.png" class="nothing-img">

    </div>
    <div class="btn" v-if="loginbtn">
      <button v-show="canIUse"
                  open-type="getUserInfo"
                  bindgetuserinfo="bindGetUserInfo"
                  @click="login">授权登录</button>
    </div>
   </div>
  </div>
</template>

<script>
  import {login} from '@/utils/fetch.js'
  export default {
    data(){
      return{
        bookarr:[],
        lookarr:[],
        loginbtn:true,
        loading:false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    methods: {
      initData(){
        this.bookarr=[]
          this.lookarr=[]
      },
      login() {
        this.initData()
        loading:true
        login()
        loading:false
      },
      getData() {
        this.initData()
        this.$fetch.get('/readList',{},res=>{
          this.lookarr=res.data
        })
      },
      getcollect(){
        this.initData()
        this.$fetch.get('/collection',{}, res=>{
          this.bookarr=res.data
        })
      },
      handlelook(){
        wx.switchTab({
            url:'/pages/read/main'
        })
      },
      handlecollect(){
        wx.switchTab({
          url: '/pages/collect/main'
        })
      },
      bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
      }
    },
    // onShow(){
    //   this.getData()
    //   this.getcollect()
    // },
    onLoad() {
      // 查看是否授权
      this.loading=true
      let self=this
      wx.getSetting({
        success: function(res){

          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                // console.log(res.userInfo)
                self.loginbtn=false
                self.getData()
                self.getcollect()
                self.loading=false
                // console.log(self);
              }
            })
          }
        }
      })
    },



  }
</script>

<style scoped>
  .loading{
    width: 200rpx;
    height: 200rpx;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .content{
    margin: 0 auto;
    width: 100%;
    height: 800 rpx;
    background: #1982D3;
    padding-bottom: 40rpx;
  }
  .message{
    height: 400 rpx;
    display: flex;
    align-items: flex-start;
    width: 400 rpx;
  }
  .open-data{
    margin-left: 40rpx;
    width:120rpx;
    height: 120rpx;
    display: flex;
    text-align: center;
    overflow: hidden;
    border-radius:50%;
  }
  .message-name{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 120rpx;
    padding-left: 30rpx;
    color: #fff;
    font-size: 14px;
  }
  .myall{
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
  }
  .one{
    color: #fff;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nothing{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  .nothing-img{
    width: 60rpx;
    height: 60rpx;
  }
  .btn{
    padding: 0 40rpx;
    margin-top: 500rpx;
  }
</style>
