const { Article } = require('../../model/article');
// 引入 mongoose-sex-page 模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
  // 接收客户端传递过来的当前页参数，如果没有传页码，默认为1
  const page = req.query.page || 1;

  // 联合查询 populate
  // page 指定当前页； size 指定每页显示条数； display 指定客户端显示的页码数量
  // exec 向数据库中发送查询请求
  let result = await pagination(Article).find({}).page(page).size(4).display(5).populate('author').exec();
 
  // res.send('欢迎来到博客首页');
  res.render('home/default.art', {
    result: result
  });
}