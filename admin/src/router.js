import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CategoryEidt from './views/CategoryEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
