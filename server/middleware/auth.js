module.exports = options =>{
    return async (req,res,next)=>{
        const jwt = require('jsonwebtoken')
        const assert = require('http-assert')
        //判断 有没有权限
        const token = String(req.headers.authorization || '').split(' ').pop() //后端 用小写  ，前端 大写
        
        // assert(token, 401,'没有token，请登录')
        if(!token){
            return res.status(401).send({
                message:'没有token，请登录'
            })
        }

        const { id } = jwt.verify(token,req.app.get('secret')) //解密 token 验证  获取 user id

        if(!id){
            return res.status(401).send({
                message:'无效的 token'
            })
        }

        req.user = await require('../models/AdminUser').findById(id)
        
        if(!req.user){
            return res.status(401).send({
                message:"请先登录"
            })
        }
        await next()
    };
}