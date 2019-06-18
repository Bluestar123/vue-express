module.exports = app =>{ //传递的app  就是 express 实例的app  直接使用
    const express = require('express')
    const router = express.Router()
    const CategoryModel = require('../../models/category')

    //创建 
    router.post('/categories',async (req,res)=>{
        // console.log(req.body)  前端传递的参数
       const model = await CategoryModel.create(req.body);

       res.send(model)//创建完  发回给 客户端
    })

    //获取列表
    router.get('/categories',async (req,res)=>{
        //populate  关联parent对象，不光是 _id，还有name，是parent的整个对象
        const items = await CategoryModel.find().populate('parent').limit(10)

        res.send(items)
    })

    //获取某一项信息
    router.get('/categories/:id',async (req,res)=>{
        const item = await CategoryModel.findById(req.params.id)
        res.send(item)
    })
    //update 某一项
    router.put('/categories/:id',async (req,res)=>{
        console.log(req.body)
        const model = await CategoryModel.findByIdAndUpdate(req.params.id,req.body)//根据 id 替换
        res.send(model)
    })
    //删除某一项
    router.delete('/categories/:id',async (req,res)=>{
        await CategoryModel.findByIdAndDelete(req.params.id)

        res.send({
            msg:'success'
        })
    })

    app.use('/admin/api',router) //挂在路由    前缀
}