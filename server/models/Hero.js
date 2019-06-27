// 建立模型  
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//模型字段
    name:{type:String},
    avatar:{type:String}, // 保存的是图片地址  
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],//做表的关联  战士 射手 来自分类
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
    }],//  复数  用数组
    items1:[
        {type:mongoose.SchemaTypes.ObjectId,ref:'Item'}
    ],//顺风出装
    items2:[
        {type:mongoose.SchemaTypes.ObjectId,ref:'Item'}
    ],//逆风出装
    usageTips:{type:String},//使用技巧
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String}
    }]
})

module.exports = mongoose.model('Hero',schema,'heroes')