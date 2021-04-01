//引入文章集合
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
  // 接收客户端传递的参数 id
  let id = req.query.id;
  await Article.findOneAndDelete({_id: id});
  // 将页面重定向到用户列表页   
  res.redirect('/admin/article');
}