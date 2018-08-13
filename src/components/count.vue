<template>
  <div>
    <div class="num">
     <span>{{num}}</span>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      num: Number
    }
  }
</script>

<style scoped>
.num{
  color: #13ce66;
  width: 200px;
  height: 100px;
  font-size: 20px;
  line-height: 100px;
  font-weight: 700;
  text-align: center;
}
</style>
