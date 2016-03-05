var mongoose = require('mongoose');

/*
level 含义示例：
1：社长
2：部长
3. 社员
4. 会员
 */

var clubMemeber = {
	name : String,
	title : String,
	level : Number,
};

var clubSchema = new mongoose.Schema({
		name : String,
		information : String,
		tags : [String],
		members : [clubMemeber],
	});

//fn(err)
clubSchema.statics.memberAdd = function (club, member, fn) {
	this.update({
		name : club
	}, {
		$push : {
			members : member
		}
	}, fn(err));
}

//fn(err)
clubSchema.statics.memberDelete = function (club, member, fn) {
	this.update({
		name : club
	}, {
		$pull : {
			members : member
		}
	}, fn(err,raw));
}
var Club = mongoose.model('Club', clubSchema);
module.exports = Club;
