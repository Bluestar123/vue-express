module.exports = app =>{ //传递的app  就是 express 实例的app  直接使用
    const express = require('express')
    const assert = require('http-assert')
    
   //返回token
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams:true //合并 url参数  有自己定义的resource
    })
    // const CategoryModel = require('../../models/category')  写死组件  改为 通用组件

    //创建 
    router.post('/',async (req,res)=>{
        // console.log(req.body)  前端传递的参数

       const model = await req.model.create(req.body);

       res.send(model)//创建完  发回给 客户端
    })

    //获取列表
    router.get('/',async (req,res)=>{
        const queryOptions={}
        if(req.model.modelName==='Category'){
            queryOptions.populate = 'parent'
        }else if(req.model.modelName==='Article'){
            queryOptions.populate = 'categories'  //关联的 model 的绑定id  的 名称，该id 下的所有信息
        }
        
        
        //populate  关联parent对象，不光是 _id，还有name，是parent的整个对象
        const items = await req.model.find().setOptions(queryOptions).limit(10)

        res.send(items)
    })

    //获取某一项信息
    router.get('/:id',async (req,res)=>{
        const item = await req.model.findById(req.params.id)
        res.send(item)
    })
    //update 某一项
    router.put('/:id',async (req,res)=>{
        console.log(req.body)
        const model = await req.model.findByIdAndUpdate(req.params.id,req.body)//根据 id 替换
        res.send(model)
    })
    //删除某一项
    router.delete('/:id',async (req,res)=>{
        await req.model.findByIdAndDelete(req.params.id)

        res.send({
            msg:'success'
        })
    })



    //定义授权中间件
    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware = require('../../middleware/resource')

    //:resource  代表任意字符
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router) //挂在路由    前缀


    const multer = require('multer') //专门处理 数据上传
    const upload = multer({dest:__dirname + '/../../uploads'})//绝对路径
    //上传文件                 单个文件上传   file上传的文件名，可以再el里面改
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async (req,res)=>{
        const file = req.file //upload 在req对象上 添加file变量

        //以后会是写死的一个服务端的地址  
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    //登录
    app.post('/admin/api/login',  async (req,res)=>{

        const {username,password} = req.body;

        //1根据用户名 找用户
        const AdminUser = require('../../models/AdminUser')

        //因为 model里面 设置 select为false，默认 获取不到，， 所以添加  select + password
        const user = await AdminUser.findOne({username}).select('+password');
        
        //条件，如果有user 继续。   如果没有状态码422，message .....
        // assert(user, 422, '用户不存在111')

        if(!user){
            // 这种设置  前端 不会错误，正常得到返回数据
            // return res.send({
            //     code:422,
            //     msg:'用户不存在'
            // })

            //这种设置状态码  前端可以捕获异常  ，相应里 统一封装
            return res.status(422).send({
                message:'用户不存在'
            })
        }


        
        //2.校验密码

        //用插件  比较 明文 密文
        const isValid = require('bcrypt').compareSync(password,user.password)

        // assert(isValid,422,'密码错误')
        if(!isValid){
            return res.status(422).send({
                message:'密码错误'
            })
        }
        
        const token = jwt.sign({
            id:user._id // 整合添加到 token中, 可以多个值
        },app.get('secret'))

        return res.send({token})
    })


    //错误处理
    app.use(async (err,req,res,next)=>{
        console.log(22222222222222222222222222222222)
        console.log(err.message)
        res.status(err.statusCode ||500).send({
            message:err.message
        })
    })
}