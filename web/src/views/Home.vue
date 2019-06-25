<template>
  <div>
    <swiper :options='swiperOption' ref='mySwiper'>
      <swiper-slide>
        <img class='w-100' src="//ossweb-img.qq.com/upload/adw/image/20190624/fa3043b9192d68a4ed53ae08b683fa0b.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class='w-100' src="//ossweb-img.qq.com/upload/adw/image/20190625/9d3c246aaa9560b1178d43e2fab79457.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class='w-100' src="//ossweb-img.qq.com/upload/adw/image/20190625/7266ec9ff4ecdffcab75572ced22a433.jpeg" alt=""> 
      </swiper-slide>

      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot='pagination'></div>
    </swiper>

    <!--end of swiper-->

    <div class="nav-icons text-dark-1 pt-3 text-center bg-white mt-3">
      <div class=' d-flex flex-wrap'>
        <div class='nav-item mb-3' v-for='i in 10' :key='i'>
          <i class='sprite sprite-news'></i>
          <div class='py-2'>爆料站</div>
        </div>
      </div>

      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>    
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      swiperOption:{
        pagination:{
          el:'.pagination-home'
        },
        autoplay:true
      }
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.pagination-home{
  .swiper-pagination-bullet{
    border-radius: 0.1538rem;
    background-color: map-get($colors, 'white');
    opacity: 1;
    &.swiper-pagination-bullet-active{
      background-color: map-get($colors,'info');
    }
  }
}

.nav-icons{
  border-top:1px solid $border-color;
  border-bottom:1px solid $border-color;
  .nav-item{
    width: 25%;
    border-left:1px solid $border-color;
    &:nth-child(4n+1){
      border-left:0;
    }
  }
}
</style>
