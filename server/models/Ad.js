// 建立模型  
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//模型字段
    name:{type:String},
    items:[
        {
            image:{type:String},
            url:{type:String}
        }
    ]
})

module.exports = mongoose.model('Ad',schema)