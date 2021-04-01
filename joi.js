// 引入 joi 模块
const Joi = require('joi');

// 定义对象的验证规则
const schema = {
  username: Joi.string().alphanum().min(2).max(5).required().error(new Error('username 属性没有通过验证')),
  birth: Joi.number().min(1900).max(2020).error(new Error('brith 属性没有通过验证'))
};



async function run() {
  try {
    // 实施验证（第1个参数：要验证对象，第2个参数：验证的规则）
    await Joi.validate({username: 'abc', birth: 1800}, schema);
  } catch (err) {
    console.log(err.message);
    return;
  }
  console.log('验证通过');
}

run();