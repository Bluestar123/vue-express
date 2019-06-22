import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CategoryEidt from './views/CategoryEdit.vue'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:()=>import('@/views/login'),
      meta:{isPublic:true}
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path:'/categories/create',
          component:CategoryEidt
        },{
          path:'/categories/edit/:id',
          component:CategoryEidt,
          props:true //把id 注入到 组件里   prop:['id']
        },{
          path:'/categories/list',
          component:()=>import(/* webpackChunkName: "categoryList" */ './views/CategoryList')
        },
        {
          path:'/items/create',
          component:()=>import(/* webpacChunName:"ItemEdit" */ './views/ItemEdit')
        },{
          path:'/items/edit/:id',
          component:()=>import(/* webpacChunName:"ItemEditId" */ './views/ItemEdit'),
          props:true //把id 注入到 组件里   prop:['id']
        },{
          path:'/items/list',
          component:()=>import(/* webpackChunkName: "ItemList" */ './views/ItemList')
        },
        {
          path:'/heroes/create',
          component:()=>import(/* webpacChunName:"HeroEdit" */ './views/HeroEdit')
        },{
          path:'/heroes/edit/:id',
          component:()=>import(/* webpacChunName:"HeroEditId" */ './views/HeroEdit'),
          props:true //把id 注入到 组件里   prop:['id']
        },{
          path:'/heroes/list',
          component:()=>import(/* webpackChunkName: "HeroList" */ './views/HeroList')
        },
        {
          path:'/articles/create',
          component:()=>import(/* webpacChunName:"articleEdit" */ './views/ArticleEdit')
        },{
          path:'/articles/edit/:id',
          component:()=>import(/* webpacChunName:"articleEditId" */ './views/ArticleEdit'),
          props:true //把id 注入到 组件里   prop:['id']
        },{
          path:'/articles/list',
          component:()=>import(/* webpackChunkName: "articleList" */ './views/ArticleList')
        },
        {
          path:'/ads/create',
          component:()=>import(/* webpacChunName:"adsEdit" */ './views/AdEdit')
        },{
          path:'/ads/edit/:id',
          component:()=>import(/* webpacChunName:"adsEditId" */ './views/AdEdit'),
          props:true //把id 注入到 组件里   prop:['id']
        },{
          path:'/ads/list',
          component:()=>import(/* webpackChunkName: "adsList" */ './views/AdList')
        },


        {
          path:'/admin_users/create',
          component:()=>import(/* webpacChunName:"adminUserEdit" */ './views/AdminUserEdit')
        },{
          path:'/admin_users/edit/:id',
          component:()=>import(/* webpacChunName:"adminUserEditId" */ './views/AdminUserEdit'),
          props:true //把id 注入到 组件里   prop:['id']
        },{
          path:'/admin_users/list',
          component:()=>import(/* webpackChunkName: "adminUserList" */ './views/AdminUserList')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})


router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('login')
  }
  
  next()
})

export default router