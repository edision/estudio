import mongoose from 'mongoose';

// 连接数据库
const dbconfig = require('../configs/dbconfig.json');
const options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};
mongoose.Promise = global.Promise //需要
mongoose.connect(dbconfig.connStr, options, err => {
    if (err) console.error(err);
    else console.log(`数据库连接成功！ connStr = ${dbconfig.connStr}`);
});

export default mongoose;
