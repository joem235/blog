// 导入 bcrypt 模块
const bcrypt = require('bcrypt');

async function run () {
  // 生成随机字符串
  // genSalt 方法接收一个数值作为参数，默认值为10
  // 数值越大 生成的随机字符串复杂度越高，反之复杂度越低
  // 返回生成的字符串
  const salt = await bcrypt.genSalt(10);
  // 对密码进行加密
  // 第1个参数是要进行加密的明文，第2个参数是生成的随机字符串
  // 返回值是加密后的密码
  const result = await bcrypt.hash('123456', salt);
  console.log(salt);
  console.log(result);
}

run()