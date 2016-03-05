var express = require('express');
var router = express.Router();
var Student = require('../lib/student.js');

router.get('/', function (req, res, next) {
	res.render('login', {
		title : '登录 求是潮Clubservice'
	});
});

router.post('/', function (req, res, next) {

	var data = req.body.user;
	Student.userAuthenticate(data.stuid, data.pwd, function (err, student) {
		if (err)
			next(err);
		if (!student) {
			res.error('学号或密码错误！');
			res.redirect('back');
		}
		if (student) {
			req.session.user = {
                id: student.stuid,
                name: student.name,
            }
			res.redirect('/');
		}
	});

});

module.exports = router;
