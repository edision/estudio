import Koa from 'koa';
import cors from 'kcors';
import body from 'koa-bodyparser';
import logger from 'koa-logger';
import responseTime from 'koa-response-time';
import convert from 'koa-convert';
import session from 'koa-generic-session';

import path from 'path';

import db from './lib/db';
import hashparam from './routes/hashparam';

// ENVIRONMENT VARIABLES
const SECRET         = process.env.SECRET           || 'faekkkeee00$';
const PORT           = process.env.PORT             || 3000;
const COUCHBASE_URI  = process.env.COUCHBASE_URI    || 'couchbase://127.0.0.1';
const COUCHBASE_BUCK = process.env.COUCHBASE_BUCKET || 'default';
const PASSWORD       = process.env.PASSWORD         || 'superfakepassword';

const app = new Koa();
app.proxy = true; //允许代理连接

// CORS,LOGGER&RESPONSE-TIME
app.use(cors());
app.use(responseTime());
app.use(logger());

// SESSION
app.keys = [SECRET];
app.use(convert(session()))

// BODY-PARSER
app.use(body({
    onerror: (err, ctx) => {
        ctx.throw('Error parsing the body information', 422);
    }
}));

// 保持数据库连接对象
app.use(async(ctx, next) => {
    ctx.state.db = db;
    await next();
});

// ERROR HANDLER
///

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



export default app;
