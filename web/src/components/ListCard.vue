<template>
  <div>
    <m-card :title='title' :icon='icon'>
      <div slot='home'>
        <div class="nav jc-between">
          <div class="nav-item"
           :class='{"active":active === i}'
           v-for="(category,i) in categories"
           :key='i'
           @click='active = i'
           >
            <div class="nav-link">
              {{category.name}}
            </div>
          </div>
        </div>

        <swiper>
          <swiper-slide v-for='(category,i) in categories' :key='i'>
            <slot name='items' :category='category'></slot>
          </swiper-slide>
          
        </swiper>
      </div>
    </m-card>


    <m-card title='英雄列表' icon='menu'></m-card>
    
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:true
        },
        categories:{
            type:Array,
            required:true
        }
    },
  data(){
    return {
        active:0
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
