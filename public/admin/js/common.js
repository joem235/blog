function serializeToJson(form) {
  var result = {};
  // serializeArray() 获取到表单中用户输入的内容，返回值是数组 
  // [{name: 'email', value:: '用户输入的内容'}]
  var f = form.serializeArray();
  // 把数组转换为对象 {enail: 'zhangsan@163.com', password: '123456'}
  f.forEach(function(item) {
    result[item.name] = item.value;
  });
  return result;
} 