var express = require('express');
var router = express.Router();
var Student = require('../lib/student.js');
var Club = require('../lib/club.js');
var crypto = require('crypto');

//登陆用户
router.post('/user/login',function(req, res, next){
    var data = req.body.user;
    Student.findOne({
		stuid : data.stuid;
	}, function (err, student) {
		if (err)
            //数据库连接失败
            return res.json({auth:0});
        if (!student)
            //用户不存在
            return res.json({auth:-1});
        var sha1 = crypto.createHash('sha1');
        sha1.update(data.pwd);
        if (sha1.digest('hex') != student.pwd) {
            //密码错误
			return res.json({auth:-2});
		} 
        //验证成功
        return res.json({auth:1,student:student});
	});
});


//删除社团成员
router.post('/member/delete', function (req, res, next) {

	var current_club = req.body.current_club;
	var member = req.body.member;
	member.level = parseInt(member.level);
	//console.log(current_club)
	//console.log(member)
	Club.update({
		name : current_club
	}, {
		$pull : {
			members : member
		}
	}, function (err) {
		if (err) {
			res.error("数据库更新异常，请稍后再试！")
			return res.json({
				update : "failed"
			})
		}
		Student.update({
			name : req.session.user.name
		}, {
			$pull : {
				clubs : current_club
			}
		}, function (err) {
			//未解决：此处可能出现club已更新而student未更新(数据库连接失败)
			if (err) {
				res.error("数据库更新异常，请稍后再试！");
				return res.json({
					update : "failed"
				});
			}
			return res.json({
				update : "succeeded"
			});
		});
	});
});

module.exports = router;
