var express = require('express');
var router = express.Router();
var Student = require('../lib/student.js');

router.get('/', function (req, res, next) {
	Student.userFind(req.session.user.id, function (err, student) {
		if (err)
			return next(err);
		if (student) {
			res.render('myclub', {
                title : '我的社团 求是潮Clubservice',
				clubs : student.clubs,
			});
		}
	});
});

module.exports = router;
