// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  // 获取要删除的用户 id
  let id = req.query.id
  // 根据 id 删除用户
  await User.findOneAndDelete({_id: id});
  // 将页面重定向到用户列表页   
  res.redirect('/admin/user');
}