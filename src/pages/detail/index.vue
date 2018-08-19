<template>
    <div class="detail">
      <img src="/static/Spinner-1s-63px.svg" class="loading" v-show="loading">
      <div class="detail-data" v-if="!loading">
      <div class="detail-content" v-if="article.title" :style="fontsize">
        <wemark :md="article.article.content"
                link highlight type="wemark"></wemark>
      </div>
      <div class="detail-icon" >
        <img src="/static/icon/back.png" class="icon" @click="handleback">
        <img src="/static/icon/mulu.png" class="icon" @click="handlemulu">
        <img src="/static/icon/jia.png" class="icon" @click="handlejia">
        <img src="/static/icon/jian.png" class="icon" @click="handlejian">
        <img src="/static/icon/go.png" class="icon" @click="handlego">
      </div>
      <div class="mask" v-show="isshow" @click="handlexiao"></div>
        <scroll-view
          :scroll-y="true"
          class="left"
          :style="{ transform:'translateX('+trans+')'}">
        <!--<scroll-view-->
                     <!--:scroll-y="true"-->
                     <!--@click.stop="stop"-->
                     <!--class="left">-->
        <div class="catalogue-content-item"
               :style="catalogueitem._id==articleId?'background:#EDEDED':''"
               v-for="(catalogueitem,index) in cataloguearr" :key="index"
               @click="getarticle(catalogueitem._id)">
            {{catalogueitem.title}}
          </div>
        </scroll-view>
      </div>
      </div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data() {
      return {
        articleId: '',
        article: {},
        size: 100,
        fontsize: '',
        cataloguearr: [],
        index:"",
        isshow:false,
        trans:0,
        loading:false,
        NavigationBarTitle:''
      }
    },
    methods: {
      initData(){
        this.article={}
      },
      async getData () {
        this.loading=true
        this.handlexiao()
        this.initData()
        const article = await axios.get(`/article/${this.articleId}`)
        const cataloguearr = await axios.get(`/titles/${this.$root.$mp.query.bookId}`)
        this.article = article.data
        this.cataloguearr = cataloguearr.data
        this.NavigationBarTitle=this.article.title
        this.loading=false
        this.index = this.cataloguearr.findIndex(item => item._id === this.articleId)
      },
      handlejia() {
        if (this.size <= 149) {
          this.size = this.size + 5
        }
        else {
          this.size = 150
        }
        this.fontsize = `font-size:${this.size}%`
      },
      handlejian() {
        if (this.size <= 70) {
          this.size = 70
        }
        else {
          this.size = this.size - 5
        }
        this.fontsize = `font-size:${this.size}%`
      },
      handleback(){
        if(this.cataloguearr[this.index-1]){
          this.loading=true
          this.initData()
          axios.get(`/article/${this.cataloguearr[this.index-1]._id}`).then(
            res=>{
              this.article=res.data
              this.articleId=res.data.article.titleId
              this.NavigationBarTitle=res.data.title
              wx.setNavigationBarTitle({ title: this.NavigationBarTitle })
              this.index--
              this.loading=false
            }
          )

        }
        else{
          wx.showToast({title: '已经是第一章了'})
        }
      },
      handlego(){
        if(this.cataloguearr[this.index+1]){
          this.loading=true
          this.initData()
          axios.get(`/article/${this.cataloguearr[this.index+1]._id}`).then(
            res=>{
              this.article=res.data
              this.articleId=res.data.article.titleId
              this.NavigationBarTitle=res.data.title
              wx.setNavigationBarTitle({ title: this.NavigationBarTitle })
              this.index++
              this.loading=false
            }
          )
        }
        else{
          wx.showToast({title: '已经是最后一章了'})
        }
      },
      handlemulu(){
        this.isshow=true
        this.trans=0
      },
      getarticle(id){
        this.loading=true
        this.initData()
        this.handlexiao()
         axios.get(`/article/${id}`).then(res=>{
          this.article=res.data
          this.articleId=res.data.article.titleId
           this.NavigationBarTitle=res.data.title
           wx.setNavigationBarTitle({ title: this.NavigationBarTitle })

           this.index = this.cataloguearr.findIndex(item => item._id === id)
         this.loading=false
          }
        )
      },
      handlexiao(){
        this.isshow=false
        this.trans='-600rpx'
      },
      // stop(event){
      // }
    },
    onLoad(options) {
      this.articleId = options.id
      this.NavigationBarTitle=options.name
      this.getData();
        wx.setNavigationBarTitle({ title: this.NavigationBarTitle })      // options.name表示上个页面传过来的文字
    },
    onShareAppMessage (obj) {
      return {
        title: this.article.title,
        path: '/pages/detail/main?id=' + this.articleId,
        imageUrl: this.article.article.img
      }
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
.detail-content{
  padding:10px;
}
.detail-icon{
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 60rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  padding: 20rpx 0;
  border-top: 1px solid #ddd;
}
  .icon{
    display: block;
    width: 45rpx;
    height: 45rpx;

  }
  /*.lefttop{*/
    /*animation: dong 5s linear;*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*position: fixed;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*left: 0rpx;*/
    /*right:0;*/
    /*height:100%;*/
    /*width:100%;*/
    /*z-index: 800;*/
    /*background: rgba(64,64,64,.3);*/
  /*}*/

  /*.left{*/
    /*animation: dong 5s linear;*/
    /*!*transition: transform 5s ease;*!*/
    /*z-index: 998;*/
    /*position: fixed;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*left: 0rpx;*/
    /*height:100%;*/
    /*width: 85%;*/
    /*background: #fff;*/
  /*}*/
/*@keyframes dong {*/
  /*from {*/
    /*left: -760rpx;}*/
  /*to {left:0rpx;}*/
/*}*/
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  right:0;
  left:0;
  height:100%;
  z-index: 800;
  background: rgba(64,64,64,.3);
}

.left{
  transition: transform 1s ease;
  z-index: 998;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height:100%;
  width: 600rpx;
  background: #fff;
}

.catalogue-content-item{
  padding-left: 10px;
  text-align: left;
  color: #000;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-bottom: 1px solid #000;
}
</style>
