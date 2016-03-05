var express = require('express');
var router = express.Router();
var Club = require('../lib/club.js');


router.get('/:current_club', function (req, res, next) {
	var current_club = req.params.current_club;
	Club.findOne({
		name : current_club
	}, function (err, club) {
        
        //处理club不存在的情况
        if(!club){
            res.error("对不起，您访问的社团不存在！");
            return res.redirect('myclub');
        }
        
        //检查权限
        for(var i = 0;i<club.members.length;i++){
            if (club.members[i].name===req.session.user.name){
                req.session.current_level = res.locals.current_level = club.members[i].level;
                break;
            }
        }
        if (i===club.members.length)
            req.session.current_level = res.locals.current_level = 4;
        
        //未解决：此处还需要检查student是否同步club更新了数据(api.js)
        
        console.log("current_level:"+res.locals.current_level);
		var context = {
			title : current_club + ' 求是潮Clubservice',
			club_name : club.name,
			information : club.information,
			tags : club.tags,
			members : club.members,
		};
		req.session.current_club = current_club;
		res.render('current_club', context);
	});
});

module.exports = router;
