import Vue from 'vue'
import App from './App.vue'

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

import './assets/scss/style.scss'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
