// 1.引入 mongoose 第三方模块
const mongoose = require('mongoose');
// 2.创建评论集合规则
const commentSchema = new mongoose.Schema({
  // 文章 id
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  // 用户 id
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 评论时间
  time: {
    type: Date
  },
  // 评论内容
  content: {
    type: String,
    minlength: 5
  }
});
// 3.根据规则创建集合
const Comment = mongoose.model('Comment', commentSchema);
// 4.将评论集合构造函数作为模块成员进行导出
module.exports = {
  Comment
}