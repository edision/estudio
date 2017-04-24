const Koa = require("koa");
const app = new Koa();

const isDev = process.env.NODE_ENV === "development";
if(isDev) {
  // 加载webpack中间件及配置
}

app.listen(3000, function(){
  console.log("Web服务器已启动...");
});
