const guard = (req, res, next) => {
  // 判断用户访问的是否是登录页面
  // 判断用户的登录状态
  // 如果用户是登录的，将请求放行，向下执行；如果用户不是登录的，则将请求重定向到登录页
  if (req.url != '/login' && !req.session.username) {
    // 重定向到登录页
    res.redirect('/admin/login');
  } else {
    // 判断当前登录的是普通用户
    if (req.session.role == 'normal') {
      // 重定向到博客首页
      return res.redirect('/home/');
    }
    // 用户是登录的，将请求放行，向下执行
    next()
  }
}

module.exports = guard;