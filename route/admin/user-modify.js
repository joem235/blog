// 导入 bcrypt 模块
const bcrypt = require('bcrypt');
// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async (req, res, next) => {
  // 接收从客户端传递过来的请求参数
  // const body = req.body;
  const {username, email, role, state, password} = req.body;
  // 获取到地址栏中的 id 参数
  const id = req.query.id;
  // 根据 id 查询用户信息
  let user = await User.findOne({_id: id})
  //密码比对
  // let isValid = await bcrypt.compare(body.password, user.password);
  let isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    // 密码比对成功
    // 将用户信息更新数据库中 (除去密码项)
    await User.updateOne({_id: id}, {
      username: username,
      email: email,
      role: role,
      state: state,
    });
    // 将页面重定向到用户列表页   
    res.redirect('/admin/user');
  } else {
    // 密码比对失败
    // 触发错误中间件，并重定向到修改页
    let obj = {path: '/admin/user-edit', id: id, message: '密码比对错误，不能进行用户信息修改'}
    return next(JSON.stringify(obj));
  }
}