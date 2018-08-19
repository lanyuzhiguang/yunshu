<template>
    <div>
      <img src="/static/Spinner-1s-63px.svg" class="loading" v-show="loading">
     <div class="catalogue-content">
       <div class="catalogue-content-item"
            v-for="(catalogueitem,index) in cataloguearr" :key="index"
            @click="handlearticle(catalogueitem._id,bookId,catalogueitem.title)">
         {{catalogueitem.title}}
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
        cataloguearr:[],
        loading:false
      }
    },
    methods:{
      initData(){
        this.cataloguearr=[]
      },
      getcatalogue(){
        this.loading=true
        this.initData()
        axios.get(`/titles/${this.bookId}`).then(res=>{
          this.cataloguearr=res.data
          this.loading=false
          // console.log(res.data);
        })
      },
      handlearticle(val,bookId,name){
        wx.navigateTo({
          url:`/pages/detail/main?id=${val}`+`&bookId=${bookId}`+`&name=${name}`
        })
      }
    },
    onLoad (options) {
      this.bookId = options.id
      this.getcatalogue()
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
.catalogue-content{
    padding: 10px;
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
