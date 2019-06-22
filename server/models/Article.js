// 建立模型  
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//模型字段
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],//做表的关联  战士 射手 来自分类
    body:{type:String}
})

module.exports = mongoose.model('Article',schema)