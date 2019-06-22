import axios from 'axios';
import Vue from 'vue';
import router from './router'

const http = axios.create({
    baseURL:'http://localhost:3000/admin/api'
})


http.interceptors.request.use((config)=>{
    if(localStorage.token){
        
        config.headers.Authorization = 'Bearer ' +localStorage.token; //bearer 规范
    }

    return config
},err=>{
    return Promise.reject(err)
})

//响应拦截
http.interceptors.response.use((res)=>{
    return res
},err=>{
    //统一 封装 弹出 错误
    if(err.response.data.message){
        
        Vue.prototype.$message.error(err.response.data.message)
        
        if(err.response.status==401){//定好  401跳转登录页
            router.push('/login')
        }
    }
    return Promise.reject(err)
})


export default http;