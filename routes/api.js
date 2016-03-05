var express = require('express');
var router = express.Router();
var Student = require('../lib/student.js');
var Club = require('../lib/club.js');
var crypto = require('crypto');

//��½�û�
router.post('/user/login',function(req, res, next){
    var data = req.body.user;
    Student.findOne({
		stuid : data.stuid;
	}, function (err, student) {
		if (err)
            //���ݿ�����ʧ��
            return res.json({auth:0});
        if (!student)
            //�û�������
            return res.json({auth:-1});
        var sha1 = crypto.createHash('sha1');
        sha1.update(data.pwd);
        if (sha1.digest('hex') != student.pwd) {
            //�������
			return res.json({auth:-2});
		} 
        //��֤�ɹ�
        return res.json({auth:1,student:student});
	});
});


//ɾ�����ų�Ա
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
			res.error("���ݿ�����쳣�����Ժ����ԣ�")
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
			//δ������˴����ܳ���club�Ѹ��¶�studentδ����(���ݿ�����ʧ��)
			if (err) {
				res.error("���ݿ�����쳣�����Ժ����ԣ�");
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
