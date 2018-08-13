<template>
  <div>
    <button @click="numbers++">++</button>
    <count :num="numbers"></count>
    <button @click="numbers--">--</button>
<div class="box" v-if="isShow" >
  <h1>{{msg}}</h1>
</div>

  <button class="btn"  type="primary" @click="handleClick">我是按钮</button>
  </div>
</template>

<script>
  import count from '@/components/count'
  export default {
    components: {
      count
    },
    data () {
      return {
        isShow: false,
        numbers: 9
      }
    },
    methods: {
      handleClick () {
        this.isShow = !this.isShow
      }
    }
    // created () {
    //   let self = this
    //   wx.request({
    //     url: 'http://localhost:3000/getData',
    //     method: 'GET',
    //     success (res) {
    //       self.msg = res.data.msg
    //     }
    //   })
    // }
  }
</script>

<style scoped>
  .btn{
    width: 200rpx;
    height: 200rpx;
    line-height: 200rpx;
    color: #13ce66;
    background: #ff00ff;

  }
  .box{

    background: #ffff00;
    width: 500px;
    height: 500px;
    color: #8c939d;
  }

</style>
