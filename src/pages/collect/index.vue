<template>
  <div class="collect">
    <img src="/static/Spinner-1s-63px.svg"
         class="loading" v-show="loading">
    <div class="home-list-item"
         v-for="(bookitem,bookindex) in bookarr"
         :key="bookindex" v-if="!loading"
         @click="handlebook(bookitem.book._id)">
      <div class="item-img">
        <img :src="bookitem.book.img" >
      </div>
      <div class="item-right">
        <div class="right-top">
          <div class="item-title">
            <span>{{bookitem.book.title}}</span>
          </div>
          <div class="item-content">
            {{bookitem.book.desc}}
          </div>
        </div>
        <div class="item-data ">
          <div class="author">{{bookitem.book.author}}</div>
            <span class="look">{{bookitem.book.looknums}}人在看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:false,
        bookarr:[],
        pn:1,
        size:2
      }
    },
    methods: {
      getcollect(){
        let pn=this.pn
        let size=this.size
        this.loading=true
        this.$fetch.get('/collection',{size,pn}, res=>{
          this.bookarr=res.data
          this.loading=false
        })
      },
      handlebook(val){
        wx.navigateTo({
          url:`/pages/counter/main?id=${val}`
        })
      },

    },


    onShow(){
      this.getcollect()
    },
    onPullDownRefresh(){
      // let self=this
      // wx.showNavigationBarLoading() //在标题栏中显示加载
      wx.setBackgroundTextStyle({
        textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
      })
        let pn=this.pn+1
        let size=this.size
      this.$fetch.get('/collection',{size,pn}, res=>{
        console.log(res.data)
        for(var a=0; a<res.data.length;a++){
          this.bookarr.push(res.data[a])

        }
        wx.stopPullDownRefresh()
      })
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
    margin-top: 10px;
  }
  .item-img{
    width: 30%;
  }
  .item-img img{
    width:100%;
    height:150px;
  }
  .item-right{
    width: 70%;
    height:140px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    padding-left: 14px;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .item-title{
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }
  .item-content{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:4;
    overflow: hidden;
    font-size: 12px;
    color: #999999;
    line-height:1.5;
  }
  .item-data{
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    color: #999999;
    font-size: 12px;
  }

</style>
