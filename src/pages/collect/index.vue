<template>
  <div class="collect">
    <img src="/static/Spinner-1s-63px.svg"
         class="loading" v-show="loading">
    <div class="home-list-item">
      <div class="item"
           v-for="(bookitem,bookindex) in bookarr"
           :key="bookindex" v-if="!loading"
           @click="handlebook(bookitem.book._id)">
      <img :src="bookitem.book.img" class="item-img">
      <div class="bookname">{{bookitem.book.title}}</div>

    </div>
    </div>
    <div class="loa" v-show="loameione">加载中....</div>
    <div class="loa" v-show="loamei">---我是有底线滴---</div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:false,
        bookarr:[],
        pn:1,
        loamei:false,
        loameione:false,
        qidong:true
      }
    },
    methods: {
      getcollect(){
        let pn=this.pn
        console.log(pn);
        this.loameione=false
        this.loading=true;
        this.$fetch.get(`/collection?pn=${pn}&size=6`,{}, res=>{
            if(res.data.length==0){
            this.qidong=false
            this.loading=false
            this.loamei=true
          }
          else{
            this.bookarr = this.bookarr.concat(res.data)
            this.loading=false
          }
        })
      },
      handlebook(val){
        wx.navigateTo({
          url:`/pages/counter/main?id=${val}`
        })
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

    },
    onShow() {
      this.loading=true
      // 查看是否授权
      let self=this
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            // self.loamei=false
            self.getcollect()
            self.loading=false
          }
          else{
            self.loading=false
            wx.showToast({
              title: '您还没有登录',
              duration: 2500
            });
          }
        }
      })
    },
    onUnload(){
      this.bookarr = []
    },
    onReachBottom(){
      if(this.qidong){
        this.loameione=true
        this.pn +=1
        this.getcollect()
      }
      else{
        this.loameione=false
        this.loamei=true
      }
    }
    }
</script>

<style scoped>
  .collect{
    padding: 20rpx 40rpx;
  }
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
  .home-list-item{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

  }
  .item{
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 45%;
  }
  .item-img{
    width: 100%;
    height:140px;
  }
  .bookname{
    padding-top: 15px;
    color: #8a8a8a;
    font-size: 10px;
  }
  .loa{
    text-align: center;
    color: #8a8a8a;
    font-size: 12px;
  }

</style>
