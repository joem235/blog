// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  // 标识，标识当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';

  // 接收客户端传递过来的当前页参数，如果没有传页面，默认为1
  let page = req.query.page || 1;
  // 每页显示的数据条数
  let pagesize = 5;
  // 查询用户数据的总数
  let count = await User.countDocuments({});
  // 计算总页数
  let total = Math.ceil(count / pagesize);
  // 页面对应的开始位置
  let start = (page - 1) * pagesize;

  // 将用户信息从数据库中查询处理
  let users = await User.find({}).limit(pagesize).skip(start)
  // 渲染用户列表模块
  res.render('admin/user.art', { 
    users: users,
    page: page,
    count: count,
    total: total
  })
}