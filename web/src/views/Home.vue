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

    <!-- end of nav icons -->

    <m-list-card icon='menu' title='新闻资讯' :categories="newsCats">
      <!-- slot传参 -->
      <!-- <template slot='items' slot-scope='scope'>
        <div class='py-2' v-for="n in scope.category.newsList" :key='n'>
          <span>[{{n.categoryName}}]</span>
          <span>|</span>
          <span>{{n.title}}</span>
          <span>{{n.date}}</span>
        </div>
      </template> -->
      <template #items="{category}">
        <router-link 
        tag='div'
        :to="{path:`/articles/${n._id}`}" 
        class='py-2 fs-lg d-flex' 
        v-for="(n,i) in category.newsList" 
        :key='i'>
          <span class='text-info'>[{{n.categoryName}}]</span>
          <span class='px-2'>|</span>
          <span class='flex-1 text-dark-1 text-ellipsis pr-2'>{{n.title}}</span>
          <span class='text-grey-1 fs-sm'>{{n.createdAt | date}}</span>
        </router-link>
      </template>
      
    </m-list-card>


    <m-list-card icon='menu' title='英雄列表' :categories="heroCats">
      <template #items="{category}">
        <dir class='d-flex flex-wrap' style='margin:0 -0.5rem'>
          <div class='p-2 text-center' v-for="(hero,i) in category.heroList" :key='i' style='width:20%'>
            <img :src="hero.avatar" class='w-100' alt="">
            <div>{{hero.name}}</div>
          </div>
        </dir>
      </template>
      
    </m-list-card>    
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data(){
    return {
      swiperOption:{
        pagination:{
          el:'.pagination-home'
        },
        autoplay:true
      },
      newsCats:[
        
      ],
      heroCats:[]
    }
  },
  methods:{
    async fetchNewsCats(){
      const res = await this.$http.get('/news/list')

      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('/heroes/list')
      this.heroCats = res.data
    }
  },
  created(){
    this.fetchNewsCats()
    this.fetchHeroCats()
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
