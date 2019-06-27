import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: ()=>import('./views/Main.vue'),
      children:[
        {path:'/',name:'home',component:()=>import('./views/Home.vue')},
        {path:'/articles/:id',props:true,name:'article',component:()=>import('./views/Article.vue')}
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
