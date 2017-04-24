const Koa = require("koa");
const app = new Koa();
const path = require("path");

const isDev = process.env.NODE_ENV === "development";
if (isDev) {
    // 加载webpack中间件及配置
    console.log("配置开发环境...");
    const webpackMiddleware = require("koa-webpack");
    const webpackConfig = require("./webpack.config");
    const webpack = require("webpack");
    app.use(webpackMiddleware({
      compiler: webpack(webpackConfig)
    }));
    console.log("配置完成");
} else{
    console.log("配置生产环境...");
    const favicon = require("koa-favicon");
    const serve = require("koa-static");
    app.use(favicon(path.join(__dirname, "/public")));
    app.use(serve(path.join(__dirname, "/public")));

    console.log("配置完成");
}

app.listen(3000, function() {
    console.log("Web服务器已启动...");
});
