// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入 bcrypt 模块
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  // 接收请求参数
  const {email, password} = req.body;
  // 如果用户没有输入邮件地址或密码
  if (email.trim().length == 0 || password.trim().length == 0) {
    // return res.status(400).send('<h4>邮件地址或密码错误</h4>')
    return res.status(400).render('admin/error.art', {msg: '邮件地址或密码错误'})
  }
  // 根据邮箱地址查询用户信息
  let user = await User.findOne({email: email.trim()})
  // 如果查询到了用户，user 变量的值是对象类型
  // 如果没有查询到用户，user 变量为空
  if (user != null) {
    // 查询到了用户,将客户端传递过来的密码与查询出用户信息中的密码进行比对
    // trie 比对成功；false 比对失败
    let isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      // 登录成功
      // 将用户名存储在请求对象中
      req.session.username = user.username;
      // 将用户角色存储在 session 对象中
      req.session.role = user.role;
      // res.send('登录成功');
      // 在 req.app 里拿到的就是 app.js 里的app
      req.app.locals.userInfo = user;

      if (user.role == 'admin') {
        // 重定向到用户列表页
        res.redirect('/admin/user');
      }

      // 重定向到博客首页
      res.redirect('/home/');
    }else{
      // 登录失败
      res.status(400).render('admin/error.art', {msg: '邮件地址或密码错误'})
    }
  } else {
    // 没有查询到用户
    res.status(400).render('admin/error.art', {msg: '邮件地址或密码错误'})
  } 
  
}