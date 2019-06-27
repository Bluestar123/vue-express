// 建立模型  
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//模型字段
    name:{type:String},                        //ref  关联的模型
    parent:{type:mongoose.SchemaTypes.ObjectId ,ref:'Category'}//用的 数据中的_id  所以 不能是String
})

/** 如果 每个分类都有就没事    如果有的分类 没有文章   有个分类 有20篇文章    ，前端查20篇    ，那返回的文章就都是一个分类的 */


//关联 
schema.virtual('children',{  //子分类
    localField:"_id",
    foreignField:'parent',  //外键     子集分类的属性
    justOne:false,
    ref:'Category'  //关联的 model
})

//关联新闻
schema.virtual('newsList',{
    localField:"_id",
    foreignField:'categories',  //文章的属性
    justOne:false,
    ref:"Article"
})



module.exports = mongoose.model('Category',schema)