// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  // 标识，标识当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';
  
  // 获取到地址栏中的 id 参数
  const {message, id} = req.query;
  // 如果当前传递了 id 参数
  if (id) {
    // 修改操作 根据id查询用户信息
    let user = await User.findOne({_id: id})
    // 渲染用户编辑修改页面
    res.render('admin/user-edit.art', {
      message: message,
      user: user,
      link: '/admin/user-modify?id=' + id,
      button: '修改'
    });
  } else {
    // 添加操作
    res.render('admin/user-edit.art', {
      message: message,
      link: '/admin/user-edit',
      button: '添加'
    });
  }
}