<template>
  <div class="allbook">
    <img src="/static/Spinner-1s-63px.svg"
         class="loading" v-show="loading">
    <div class="allbook-data" v-if="!loading">
      <div class="allbook-content"
           v-for="(categoryitem,index) in categoryarr" :key="index">
        <div class="allbook-title" @click="handelecategory(categoryitem._id)">
          <img :src="categoryitem.icon"
               class="category-img">&nbsp;{{categoryitem.title}}
        </div>
        <div class="allbook-list" >
          <div class="allbook-list-item"
               v-for="(bookitem,bookindex) in categoryitem.books"
               :key="bookindex" @click="handlebook(bookitem._id)">
            <div class="item-img">
              <img :src="bookitem.img" >
            </div>
            <div class="item-right">
              <div class="right-top">
                <div class="item-title">
                  <span>{{bookitem.title}}</span>
                </div>
                <div class="item-content">
                  {{bookitem.desc}}
                </div>
              </div>
              <div class="item-data ">
                <div class="author">{{bookitem.author}}</div>
                <div class="time">
                    <span class="updata">
                      <gettime :time="bookitem.createTime"></gettime>
                    </span>
                  <span class="look">{{bookitem.looknums}}人在看</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loa" v-show="loameione">正在加载中...</div>
    <div class="loa" v-show="loamei">---我是有底线滴---</div>
  </div>
</template>

<script>
  import gettime from '@/components/time'
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        swiperarr:[],
        categoryarr:[],
        pn:1,
        qidong:true,
        loading:false,
        loameione:false,
        loamei:false,
      }
    },
    components:{
      gettime
    },
    methods: {
      getcategory(){
        let pn=this.pn
        this.loameione=false
        this.loading=true;
        axios.get(`/category/books?pn=${pn}&size=2&booksSize=2`).then(res => {
         if(res.data.length==0){
           this.loading=false
           this.qidong=false
           this.loamei=true

         }else{
           this.categoryarr=this.categoryarr.concat(res.data)
           console.log(res.data);
           this.loading=false
         }
        })
      },
      handelecategory(val){
        // getApp().globalData.category_id=val
        // console.log(123);
        wx.navigateTo({
          url:`/pages/category/main?id=${val}`
        })
      },
      // getcategory(){
      //   axios.get('/category/books').then(res => {
      //     this.categoryarr=res.data
      //   })
      // },
      handlebook(id){
        wx.navigateTo({
          url:`/pages/counter/main?id=${id}`
        })
      }
    },
    mounted () {
      this.getcategory();
    },
    onUnload(){
      this.bookarr = []
    },
    onReachBottom(){
      if(this.qidong){
        this.loameione=true
        this.pn +=1
        this.getcategory()
      }
      else{
        this.loameione=false
        this.loamei=true
      }
    }
  }
</script>

<style scoped>
  .allbook{
    padding: 10px;
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
  .allbook-title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 10px;
    color: #000;
    font-size: 18px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
  }
  .category-img{
    width: 30px;
    height: 40px;
  }
  .allbook-content{
    padding: 10px 0;
    background: #fff;
  }
  .allbook-list-item{
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
  .updata{
    padding-right: 5px;

  }
  .time{
    display: flex;
    justify-content: flex-start;
  }
  .loa{
    text-align: center;
    color: #8a8a8a;
    font-size: 12px;
  }


</style>

