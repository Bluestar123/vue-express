const express = require('express');

const app = new express();

//返回的token 需要 验证的密钥，全局写死
app.set('secret','123456789')  //应该放在环境里，不是放在代码里

app.use(require('cors')()) //解决跨域
app.use(express.json()) //models 模型  解析

//静态文件   访问图片也得用路由，链接访问
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./plugins/db')(app)

require('./routes/admin')(app)

app.listen(3000,()=>{
    console.log('正在监听3000端口')
})