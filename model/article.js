// 1.引入 mongoose 第三方模块
const mongoose = require('mongoose');
// 引入 joi 模块
const Joi = require('joi');
// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: [true, '请填写文章标题']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '请传递作者']
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String,
  }
});
// 3.根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// 4.将文章集合作为模块成员进行导出
module.exports = {
  Article
}