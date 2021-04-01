// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 引入 mongoose-sex-page 模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
  // 接收客户端传递过来的当前页参数，如果没有传页面，默认为1
  const page = req.query.page || 1;

  // 标识，标识当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';

  // 将文章信息从数据库中查询处理
  // 联合查询 populate
  // page 指定当前页； size 指定每页显示条数； display 指定客户端显示的页码数量
  // exec 向数据库中发送查询请求
  let articles = await pagination(Article).find({}).page(page).size(3).display(3).populate('author').exec();
  // res.send(articles);

  // 渲染文章列表页面模板
  res.render('admin/article.art', {
    articles: articles,
  });
}