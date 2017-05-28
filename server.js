import Koa from 'koa';
import path from 'path';
import mongoose from 'mongoose';
import hashparam from './routes/hashparam';

const app = new Koa();



const isDev = process.env.NODE_ENV === "development";
if (isDev) {
    // 路由
    app.use(hashparam.routes());
    app.use(hashparam.allowedMethods());

    // 加载webpack中间件及配置
    console.log("配置开发环境...");
    const webpackMiddleware = require("koa-webpack");
    const config = require("./webpack.config");
    // const webpack = require("webpack");
    app.use(webpackMiddleware({
        config: config,
        dev: {
            publicPath: config.output.publicPath,
            stats: {
                colors: true
            }
        }
    }));
    console.log("配置完成");
} else {
    console.log("配置生产环境...");
    // 生产环境中间件
    const favicon = require("koa-favicon");
    const serve = require("koa-static");
    app.use(favicon(path.join(__dirname, "/public")));
    app.use(serve(path.join(__dirname, "/public")));
    // 路由
    app.use(hashparam.routes());
    app.use(hashparam.allowedMethods());
    console.log("配置完成");
}

const port = 3000;
app.listen(port, function() {
    console.log(`Web服务器已启动。访问地址: http://localhost:${port}`);
});

// 连接数据库
const dbconfig = require('./configs/dbconfig.json');
mongoose.Promise = global.Promise //需要
mongoose.connect(dbconfig.connStr, err => {
    if (err) console.error(err);
    else console.log(`数据库连接成功！ connStr = ${dbconfig.connStr}`);
});

export default app;
