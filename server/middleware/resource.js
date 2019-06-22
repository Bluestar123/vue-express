module.exports = options => {
    return async (req,res,next)=>{
        //中间件  express需要按 顺序执行

        //inflection 可以转换 大小写 model   复数变单数
        const modelName = require('inflection').classify(req.params.resource);//
        
        req.model = require(`../models/${modelName}`)

        next()
    }
}