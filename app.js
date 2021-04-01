// 引入 express 框架
const express = require('express');
// 处理路径的模块
const path = require('path');
// 引入 body-parser 模块，用来处理 post 请求参数
const bodyParser = require('body-parser');
// 导入 express-session 模块
const session = require('express-session');
// 导入 art-template 模板引擎
const template = require('art-template');
// 引入处理日期的 dateformat 第三方模块
const dateFormat = require('dateformat');
// 导入 morgan 第三方模块 
const morgan = require('morgan');
// 导入 config 模块
const config = require('config');

// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
// require('./model/user');
// 配置 body-parser 模块，处理 post 请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置 session
app.use(session({ 
  secret: 'secret key' ,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

// 告诉 express 框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉 express 框架模板的默认后缀是什么
app.set('view engine', 'art');
// 渲染后缀为 art 的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

// 向模板内部导入dateFormat变量 处理日期格式的方法
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// config.get 获取 title 属性
console.log(config.get('title'))

// 获取系统环境变量，返回值是对象
if (process.env.NODE_ENV == 'development') {
  // 当前是开发环境
  console.log('当前是开发环境');
  // 在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中
  app.use(morgan('dev'));
} else {
  // 当前是生产环境
  console.log('当前是生产环境');
}

// 拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
// 将路由和请求路径进行匹配
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
  // 框字符串类型转换为对象类型 JSON.parse()
  const result = JSON.parse(err);
  // 循环参数变量
  //{path: '/admin/user-editd', id: id, message: '密码比对错误，不能进行用户信息修改'}
  let params = [];
  for (var attr in result) {
    if (attr != 'path') {
      params.push(attr + '=' + result[attr]);
    }
  }
  // res.redirect(`${result.path}?message=${result.message}`);
  res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口
app.listen(80);
console.log('网站服务器启动成功');