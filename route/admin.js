// 引入 express 框架
const express = require('express');
// // 导入 bcrypt 模块
// const bcrypt = require('bcrypt');
// // 导入用户集合构造函数
// const { User } = require('../model/user');
// 创建博客展示页面路由对象
const admin = express.Router();

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 创建实现添加用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 修改用户功能
admin.post('/user-modify', require('./admin/user-modify'));

// 删除用户功能
admin.get('/delete', require('./admin/user-delete'));

// 文章列表页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 文章添加路由
admin.post('/article-add', require('./admin/article-add'));

// 文章删除路由
admin.get('/delete-article', require('./admin/article-delete'));

// 将路由对象做为模块成员进行导出
module.exports = admin;