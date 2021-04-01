// 导入 formidable 第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
  // 1.创建表单解析对象
  const form = new formidable.IncomingForm();
  // 2.设置上传文件的存放位置
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  // 3.保留上传文件的扩展名
  form.keepExtensions = true;
  // 4.对表单进行解析
  form.parse(req, async (err, fields, files) => {
    // err 错误对象：如果表单解析失败，err里面存储错误信息；如果表单解析成功，err将会是null
    // fields 对象类型，保存普通表单数据
    // files 对象类型，保存上传文件相关的数据
    // res.send(files.cover.path.split('public')[1])
    // 向文件集合中插入数据
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split('public')[1],
      content: fields.content
    });
    // 将页面重定向到文章列表页
    res.redirect('/admin/article');
  })
  // res.send('ok')
}