const express = require('express');

const app = new express();

app.use(require('cors')()) //解决跨域
app.use(express.json()) //models 模型  解析

require('./plugins/db')(app)

require('./routes/admin')(app)

app.listen(3000,()=>{
    console.log('正在监听3000端口')
})