/*
会话约定：
user[id]为学号
user[name]为姓名
current_club为现在显示在视图的社团
current_level为在当前社团中的权限
*/
module.exports = function (req, res, next) {
	var user = req.session.user;
    var current_level = req.session.current_level;
    
	if (user) {
		req.user = res.locals.user = user;	
	}

	//redirect to login page
	if (!user) {
		if (req.path === '/login')
			return next();
		else 
            return res.redirect('/login');
	}
    
    if (!current_level)
        current_level = 4;
    
    req.current_level = res.locals.current_level = current_level;
    
    return next();

}
