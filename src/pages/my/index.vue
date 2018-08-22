<template>
  <div class="my-contaner">
    <img src="/static/Spinner-1s-63px.svg"
         class="loading" v-show="loading">
    <div v-if="!loading">
      <div class="my">
        <div class="content">
          <div class="message">
            <div class="message-imgs">
              <img :src="user.avatarUrl" alt="" class="user-img">
            </div>
            <div class="message-name">
              {{user.nickName}}
            </div>
          </div>
          <div class="myall">
            <div class="one" @click="handlecollect">
              <div class="num">{{bookarr.length}}</div>
              <div class="numname">
                收藏
              </div>
            </div>
            <div class="one" @click="handlelook">
              <div class="num">{{lookarr.length}}</div>
              <div class="numname">
                已看
              </div>
            </div>
            <div class="one">
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
        <img src="/static/icon/wendang.png" class="nothing-img">
        <img src="/static/icon/jianyi.png" class="nothing-img">
        <img src="/static/icon/look.png" class="nothing-img">
        <img src="/static/icon/qianbao.png" class="nothing-img">
      </div>
      <div class="btns" v-show="!user.nickName">
        <button open-type="getUserInfo" @getuserinfo="onGotUserInfo" class="btn">获取用户信息</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from "@/utils/fetch.js";

  export default {
    data() {
      return {
        user: {},
        bookarr: [],
        lookarr: [],
        loading: false
      };
    },
    methods: {
      initData() {
        this.bookarr = [];
      },
      login() {
        return new Promise(resolve => {
          this.loading = true;
          login().then(() => {
            this.loading = false;
            resolve()
          });
        })
      },
      getData() {
        this.$fetch.get("/readList", {}, res => {
          this.lookarr = res.data;
          this.loading = false;
        });
      },
      getcollect() {
        this.$fetch.get("/collection", {}, res => {
          this.bookarr = res.data;
          this.loading = false;
        });
      },
      handlelook() {
        wx.switchTab({
          url: "/pages/read/main"
        });
      },
      handlecollect() {
        wx.navigateTo({
          url: "/pages/collect/main"
        });
      },
      onGotUserInfo(e) {
        this.user = e.target.userInfo;
        console.log(this.user);
        this.login().then(()=>{
          this.getData();
          this.getcollect();
        })
      }
    },
    onShow() {
      this.loading = true;
      // 查看是否授权
      let self = this;
      wx.getSetting({
        success: function(res) {
          console.log(res);
          if (res.authSetting["scope.userInfo"]) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                // console.log(res, "user");
                self.loginbtn = false;
                self.user = res.userInfo;
                self.getData();
                self.getcollect();
              }
            });
          } else {
            self.num = true;
            self.loading = false;
          }
        }
      });
    },
    GetUserInfo(e) {
      console.log("出发");
      this.user = e.target.userInfo;
      this.getData();
      this.getcollect();
    }
  };
</script>

<style scoped>
  .loading {
    width: 200 rpx;
    height: 200 rpx;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .content {
    margin: 0 auto;
    width: 100%;
    height: 800 rpx;
    background: #1982D3;
    padding-bottom: 40 rpx;
  }

  .message {
    height: 400 rpx;
    display: flex;
    align-items:  center;
    justify-content:flex-start;
    width: 400 rpx;
  }
  .message-imgs{
    width: 120rpx;
    height: 120rpx;
    display: flex;
    align-items: center;
    margin-left: 40rpx;
  }
  .user-img {
    display: block;
    width: 100%;
    height:100%;
    border-radius: 50%;
  }

  .message-name {
    margin-left: 10px;
   text-align: center;
    color: #fff;
    font-size: 14px;
  }

  .myall {
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
  }

  .one {
    color: #fff;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nothing {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

  }
  .nothing-img {
   display: block;
    width: 60rpx;
    height: 60rpx;
  }

  .btns {
    padding: 0 40 rpx;
    margin-top: 500 rpx;
  }

  .btn {
    padding: 0 40rpx;
    margin-top: 500rpx;
    background: #1982D3;
    color: #fff;
  }
</style>
