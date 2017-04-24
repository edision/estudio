const Koa = require("koa");
const app = new Koa();

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
}

app.listen(3000, function() {
    console.log("Web服务器已启动...");
});
