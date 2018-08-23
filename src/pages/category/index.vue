<template>
  <div class="categoryall">
    <img src="/static/Spinner-1s-63px.svg"
         class="loading" v-show="loading">
    <div class="categoryall-data" v-if="!loading">
      <div class="categoryall-content">
        <div class="categoryall-list" >
          <div class="categoryall-list-item"
               v-for="(bookitem,bookindex) in categoryarr"
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
    <div class="loa" v-show="loamei">---我是有底线滴---</div>
  </div>
</template>

<script>
  import gettime from '@/components/time'
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        loading:false,
        categoryarr:[],
        pn:1,
        typeId:'',
        NavigationBarTitle:'',
        qidong:true,
        loamei:false,
      }
    },
    components:{
      gettime
    },
    methods: {
      getcategory(){
        this.loading=true
        let pn=this.pn
        axios.get(`/category/${this.typeId}/books?pn=${pn}&size=4`).then(res => {
          if(res.data.books.length==0){
            this.loading=false
            this.qidong=false
            this.loamei=true
          }
          else if(res.data.books.length<4){
            this.NavigationBarTitle=res.data.title
            wx.setNavigationBarTitle({ title: this.NavigationBarTitle })
            this.categoryarr=this.categoryarr.concat(res.data.books)
            this.loading=false
             this.loamei=true
          }
          else{
            this.NavigationBarTitle=res.data.title
            wx.setNavigationBarTitle({ title: this.NavigationBarTitle })
            this.categoryarr=this.categoryarr.concat(res.data.books)
            this.loading=false
          }

        })
      },
      handlebook(val){
        wx.navigateTo({
          url:`/pages/counter/main?id=${val}`
        })
      },
    },
    onLoad (options) {
      this.typeId= options.id
      this.pn=1
      this.loamei=false
      this.qidong=true
      this.getcategory();
    },
    onUnload(){
      this.categoryarr = []
    },
    onReachBottom(){
      this.loamei=false
      if(this.qidong){
        this.pn +=1
        this.getcategory()
      }
      else{
        this.loamei=true
      }
    }
  }
</script>

<style scoped>
  .categoryall{
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
  .categoryall-content{
    padding: 10px 0;
    background: #fff;
  }
  .categoryall-list-item{
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

