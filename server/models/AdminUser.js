// 建立模型  
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//模型字段
    username:{type:String},
    
    password:{
        type:String, 
        select:false, //加这个 密码 不会被查到，不和返回给前端
        set(val){ //加密密码
            return require('bcrypt').hashSync(val,10); //生成密码 散列值   10等级  10-12间一般
    }}
})

module.exports = mongoose.model('AdminUser',schema)