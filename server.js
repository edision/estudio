const Koa = require("koa");
const app = new Koa();



app.listen(3000, function(){
  console.log("Web服务器已启动...");
})
