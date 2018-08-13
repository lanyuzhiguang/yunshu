<template>
  <div class="home">
    <div class="home-data" v-if="!loading">
    <div class="swiper-content">
    <swiper indicator-dots="true"
            autoplay="true" interval="5000"
            duration="1000" indicator-color="#ddd"
            indicator-active-color="#fff" class="swiper">
      <block  v-for="swiperitem in swiperarr" :key="swiperitem._id">
        <swiper-item class="swiper-item">
          <a :href="'/pages/counter/main?id='+ swiperitem.book._id" v-if="swiperitem.book">
          <img :src="swiperitem.img" class="slide-image" />
          <span class="swiper-title">{{swiperitem.title}}</span>
          </a>
        </swiper-item>
      </block>
    </swiper>
    </div>
    <div class="home-content" v-for="(categoryitem,index) in categoryarr" :key="index">
    <div class="home-title">
      <img :src="categoryitem.icon" class="category-img">&nbsp;{{categoryitem.title}}
    </div>
    <div class="home-list" >
      <div class="home-list-item"
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
              <span class="updata">两天前</span>
              <span class="variety"> &nbsp;{{categoryitem.title}}</span>
              <span class="look">{{bookitem.looknums}}人在看</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
  </div>
</template>

<script>
import {axios} from '../../utils/index'
export default {
  data () {
    return {
      swiperarr:[],
      categoryarr:[],
    }
  },
  methods: {
    getwiper () {
      axios.get('/swiper').then(res => {
        this.swiperarr=res.data
      })
    },
    getcategory(){
      axios.get('/category/books').then(res => {
        this.categoryarr=res.data
      })
    },
    handlebook(val){
      wx.navigateTo({
        url:`/pages/counter/main?id=${val}`
      })
    }
  },
  mounted () {
    this.getwiper();
    this.getcategory();
  }
}
</script>

<style>
.home{
  padding: 10px;
}
.swiper,.swiper-item{
  width: 100%;
  height: 150px;
}
.slide-image{
  width: 100%;
  height: 150px;
}
.swiper-title{
  color: #fff;
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.home-title{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
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
  .home-content{
    padding: 10px 0;
    background: #fff;
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
