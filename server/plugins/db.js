module.exports = app =>{
    const mongoose = require('mongoose'); 
    mongoose.connect('mongodb://127.0.0.1:27017/vue-express',{
        useNewUrlParser:true//必须要加上
    })


    //把 models 里面的文件都引入了
    require('require-all')(__dirname + '/../models')
}