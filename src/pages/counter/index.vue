<template>
  <div>
    <img src="/static/Spinner-1s-63px.svg" class="loading" v-show="loading">
  <div class="book-ata" v-if="!loading">
  <div class="book-content">
    <div class="book-data">
      <div class="book-data-top">
      <div class="book-data-img">
        <img :src='bookcontent.img' >
      </div>
      <div class="book-data-right">
        <div class="book-name">
          <span>{{bookcontent.title}}</span>
        </div>
        <div class="book-author">
          <span>作者：</span>
          <span>{{bookcontent.author}}</span>
        </div>
        <div class="wholook">
          <span>{{bookcontent.looknums}}</span>
          <span>人在看</span>
        </div>
        <div class="wholike">
          <span>{{bookcontent.startsnums}}</span>
          <span>人喜欢</span>
        </div>
      </div>
    </div>
      <div class="book-data-botom">
        <button @click="collect" :disabled="isCollected"> {{isCollected ? '已收藏' : '加入收藏'}}</button>
        <button open-type="share">分享好友</button>
        <!--<button @click="handleClick">分享朋友圈</button>-->
      </div>
    </div>
    <div class="book-introduce">
      <div class="book-introduce-title">
        简介
      </div>
      <div class="book-introduce-content">
        {{bookcontent.desc}}
      </div>

    </div>
    <div class="catalogue">
      <span>
        <span class="catalogue-title">查看目录</span>
      <span class="catalogue-content">&nbsp;共{{booklength}}章</span>
      </span>
      <span class="catalogue-content">更新于2天前></span>
    </div>

  </div>
    <div class="book-bottom">
      <button class="btn" @click="handleread">阅读该书籍</button>
    </div>
  </div>
  </div>
</template>

<script>
  import {axios} from '../../utils/index'
export default {
    data(){
      return{
        bookId:'',
        bookcontent:{},
        booklength:'',
        loading:false,
        isCollected: false
      }
    },
  methods:{
    initData(){
        this. bookcontent={}
      },
    getonebook(){
        this.loading=true
        this.initData()
      axios.get(`/book/${this.bookId}`).then(res=>{
        this.bookcontent=res.data
        this.booklength=res.length
        this.isCollected = res.isCollect===1
        this.loading=false
    })
    },
    handleread(){
      wx.navigateTo({
        url: `/pages/catalogue/main?id=${this.bookId}`
      })
    },
    collect(){
      let bookId =this.bookId
       this.$fetch.post('/collection',{bookId}, res=>{
         if(res.code===200){
           wx.showToast({
             title: '收藏成功',
             icon: 'success',
             duration: 1000
           })
           this.isCollected= 1
         }
         else{
           wx.showToast({
             title: res.msg,
             icon: 'warning',
             duration: 1000
           })
         }
      })
    }
    // handleClick () {
    //   wx.showModal({
    //     title: '该功能将在上线后逐步完善'
    //   })
    // },
  },
  onLoad (options) {
    this.bookId = options.id
    this.getonebook();
  },
  onShareAppMessage (obj) {
    return {
      title: this.bookcontent.title,
      path: `/pages/counter/main?id=${this.bookId}`,
      imageUrl: this.bookcontent.img
    }
  }
}
</script>

<style>
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
.book-data{
  background: #EDEDED;
  /*display: flex;*/
  /*justify-content: space-between;*/
}
.book-data{
  background: #fff;
  padding: 10px;
}
.book-data-top{
  display: flex;
  justify-content: space-between;
}
.book-data-img{
  width: 30%;
}
.book-data-img img{
  width: 100%;
  height:150px;
}
.book-data-right{
  width: 70%;
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 10px;
}
.book-name{
  font-size: 14px;
  color: #000;
  font-weight: 700;
}
  .book-author,.wholook,.wholike{
    color: #999999;
    font-size: 12px;
    padding-top: 10px;
  }
  .book-data-botom{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .book-data-botom button{
    width: 300rpx;
    height: 64rpx;
    font-size: 15px;
    color: #999999;
    background: #EDEDED;
    line-height: 32px;
  }
  .book-introduce{
    border-top: 6px solid #EDEDED;
    padding: 10px;
    background: #fff;
  }
  .book-introduce-title{
    color: #000;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 10px;
  }
  .book-introduce-content{
    font-size: 14px;
    color: #999999;
    padding: 10px 0;
  }
.catalogue{
  border-top: 2px solid #EDEDED;
  border-bottom: 6px solid #EDEDED;
  background: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
  .catalogue-title{
    font-size: 16px;
    font-weight: 700;
    color: #000;
  }
  .catalogue-content{
    font-size: 14px;
    color: #999999;
  }
.book-bottom{
  height:30px ;
  position: absolute;
  bottom: 20px;
  padding: 10px;
  border-top: 2px solid #EDEDED;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}
  .btn{
    font-size: 12px;
    line-height: 30px;
    height: 30px;
    background: #086CDB;
    color: #fff;
  }

</style>
