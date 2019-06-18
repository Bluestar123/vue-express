// 建立模型  
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//模型字段
    name:{type:String},                        //ref  关联的模型
    parent:{type:mongoose.SchemaTypes.ObjectId ,ref:'Category'}//用的 数据中的_id  所以 不能是String
})

module.exports = mongoose.model('Category',schema)