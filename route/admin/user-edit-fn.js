// // 引入 joi 模块
// const Joi = require('joi');
// 导入 bcrypt 模块
const bcrypt = require('bcrypt');
// 导入用户集合及验证用户
const { User, validateUser } = require('../../model/user');

module.exports = async (req, res, next) => {
  // // 定义对象的验证规则
  // const schema = {
  //   username: Joi.string().alphanum().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
  //   email: Joi.string().email().required().error(new Error('邮箱格式不符合验证规则')),
  //   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合验证规则')),
  //   role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
  //   state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
  // };

  try {
    // // 实施验证（第1个参数：要验证对象，第2个参数：验证的规则）
    // await Joi.validate(req.body, schema);
    await validateUser(req.body);
  }catch (err) {
    // 验证没有通过
    // 重定向回用户添加页面
    // return res.redirect(`/admin/user-edit?message=${err.message}`);
    // JSON.stringify() 将对象数据类型转换为字符串数据类型
    return next(JSON.stringify({path: '/admin/user-edit', message: err.message}))
  }

  // 根据邮箱地址查询用户是否存在
  const user = await User.findOne({email: req.body.email})
  // 如果用户已经存在，那么邮箱地址已经被占用
  if (user) {
    // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
    return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
  }
  // 对密码进行加密处理
  //生成随机字符串
  const salt = await bcrypt.genSalt(10);
  // 进行加密
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换密码
  req.body.password = password;
  // 将新用户信息添加到数据库中
  await User.create(req.body);
  // 将页面重定向到用户列表页   
  res.redirect('/admin/user');
}