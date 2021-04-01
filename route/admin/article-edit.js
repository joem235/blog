// 导入文章集合构造函数
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
  // 标识，标识当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';

  // 获取到地址栏中的 id 参数
  const {id} = req.query;
  if (id) {
    // 修改文章 根据id查询文章信息
    let article = await Article.findOne({_id: id})
    console.log(article);
    res.render('admin/article-edit.art', {
      article:article,
      button: '修改'
    });
  } else {
    // 添加文章
    res.render('admin/article-edit.art', {
      button: '添加'
    });
  }
  
}