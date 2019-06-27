<template>
  <div class="page-article" v-if='model'>
      <div class="d-flex py-3 px-2 border-bottom">
          <i class='iconfont icon-back text-blue'><</i>

            <strong class="flex-1 text-blue pl-2">
                {{model.title}}
            </strong>
            <div class="text-grey fs-xs">
                2019-01-01
            </div>
      
      </div>

      <div v-html='model.body' class='px-3 body fs-lg'></div>
  
        <div class='px-3 border-top p-2'>
            <div class='d-flex ai-center py-2'>
                <div class="iconfont icon-menu mr-2"></div>
            
                <span class='text-blue fs-lg ml-1'>相关资讯</span>
            </div>

            <div class='pt-2'>
                <router-link
                class='py-2 text-ellipsis'
                tag='div'
                v-for='(item,i) in model.related'
                :key='i'
                :to="`/articles/${item._id}`"
                >
                    {{item.title}}
                </router-link>
            </div>
        </div>
  
  </div>
</template>


<script>
export default {
    props:{
        id:{required:true,type:String}
    },
    data(){
        return {
            model:null
        }
    },
    watch:{
        id(){
            //id 改变 执行 
            this.fetch()
        }
    },
    methods:{
        async fetch(){
            const res = await this.$http.get(`/articles/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.fetch()
    }
}
</script>


<style lang="scss">
.page-article{
    .body{
        img{
            max-width: 100%;
        }

        iframe{
            width: 100%;
            height:auto;
        }
    }
}
</style>
