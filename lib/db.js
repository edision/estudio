import mongoose from 'mongoose';

// 连接数据库
const dbconfig = require('../configs/dbconfig.json');
mongoose.Promise = global.Promise //需要
mongoose.connect(dbconfig.connStr, err => {
    if (err) console.error(err);
    else console.log(`数据库连接成功！ connStr = ${dbconfig.connStr}`);
});

export default mongoose;
