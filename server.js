import Koa from 'koa';
import path from 'path';
const app = new Koa();

const isDev = process.env.NODE_ENV === "development";
if (isDev) {
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
            },
            proxy:{
                "/api":{
                    target: "http://localhost:3000"
                }
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
    console.log("配置完成");
}

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/estudio");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongodb connected!');
});

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    collection: 'User' // 自定义集合名称(表名)
});
var User = mongoose.model('User', UserSchema);

app.use(async ctx => {
    let test = new User({ name: 'hello first mongo' });
    try {
        let saved = await test.save();
        console.log('saved', saved.name);
        ctx.body = saved.name;
    } catch (error) {
        console.error(error);
    }
});

const port = 3000;
app.listen(port, function() {
    console.log(`Web服务器已启动。访问地址: http://localhost:${port}`);
});


export default app;
