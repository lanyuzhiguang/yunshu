<template>
<div class="read">
  <img src="/static/Spinner-1s-63px.svg" class="loading" v-show="loading">
 <div class="read-item" v-for="(bookitem,index) in bookarr" :key="index" v-if="!loading">
   <div class="read-img">
     <img :src="bookitem.book.img">
   </div>
   <div class="read-content">
     <div class="title">{{bookitem.book.title}}</div>
     <div class="section">书籍{{bookitem.title.index}}/{{bookitem.title.total}}章节</div>
     <div class="tiao">
       <progress class="pro"
                  :percent="bookitem.percent"
                  :active="true"
                  activeColor="#7EC4EA"
                  backgroundColor="#8a8a8a"
                  :stroke-width="4"
                   ></progress>
       <span>已看{{bookitem.percent}}%</span>
     </div>
     <div class="last-look">
       <span>上次查看:&nbsp;{{bookitem.title.title}}</span>
       <span>两天前</span>
     </div>
     <div class="btns">
       <button class="btn" @click="continueread(bookitem.title)">继续阅读</button>
       <button class="btn" @click="handlecatalogue(bookitem.title.bookId)">查看文档</button>
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
       bookarr:[]
     }
    },
    methods: {

      getData() {
        this.loading=true
        this.$fetch.get('/readList', {},res=> {
            this.bookarr=res.data.map(item=>{
              item.percent=Math.floor(item.title.index/item.title.total*100)
              return item
            })
          this.loading=false
        })
      },
      handlecatalogue(val){
        this.loading=true
        wx.navigateTo({
          url: `/pages/catalogue/main?id=${val}`
        })
        this.loading=false},
      continueread(title){
        this.loading=true
        wx.navigateTo({
          // url: `/pages/detail/main?id=${title._id}` + `&bookId= ${title.bookId}`
          url: '/pages/detail/main?id=' + title._id + '&bookId=' + title.bookId
        })
        this.loading=false
          }

      // getData() {
      //   let self=this
      //   this.$fetch.get('/readList', {},function(res) {
      //       console.log(self);
      //   }
      //
      //   )
      //
      // }
      },


    onShow(){
      this.getData()
  }
  }
</script>

<style scoped>
  .read{
    padding: 20rpx 40rpx;
  }
  .read-item{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 300rpx;
  }
  .read-img{
    width: 30%;
    height: 300rpx;
  }
  .read-img img{
    width: 100%;
    height:100%;
  }
  .read-content{
    width: 70%;
    height:300rpx;
    display: flex;
    flex-direction: column;
    padding-left: 14px;
    justify-content: space-between;
  }
  .title{
    color: #000;
    font-size: 18px;
  }
  .section{
    color: #ccc;
    font-size: 14px;
  }
  .tiao, .last-look{
    line-height: 30rpx;
    height: 30rpx;
    padding-top: 16rpx;
    color: #ccc;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  progress{
    width: 70%;
  }
  .btns{
    padding-top: 16rpx;
    display: flex;
    justify-content: space-between;
  }
  .btn{
    margin: 0;
    font-size: 16px;
    line-height: 60rpx;
    color: #989898;
    width: 200rpx;
    height: 60rpx;
    border-radius: 4px;
  }

</style>
