var mongoose = require('mongoose');
var crypto = require('crypto');


var studentSchema = new mongoose.Schema({
		name : String,
		stuid : String,
		pwd : String,
		clubs : [String],
	});

//fn(err,student)
studentSchema.statics.userFind = function (stuid, fn) {
	this.findOne({
		stuid : stuid
	}, function (err, student) {
		//deal with database error
		if (err)
			return fn(err);
        if (!student)
            return fn();
		if (student)
			return fn(null, student);
	});
}

//fn(err,student)
studentSchema.statics.userAuthenticate = function (stuid, pwd, fn) {
	this.userFind(stuid, function (err, student) {
		//deal with database error
		if (err)
			return fn(err);
		if (!student)
			return fn();
		if (student) {
            var sha1 = crypto.createHash('sha1');
            sha1.update(pwd);
			if (sha1.digest('hex') === student.pwd) {
				return fn(null, student);
			} else {
				return fn();
			}
		}
	});
}

//encode password
studentSchema.methods.userHash = function () {
	if (this.pwd) {
        var sha1 = crypto.createHash('sha1');
        sha1.update(this.pwd);
		this.pwd = sha1.digest('hex');
	}
	return this;
}

var Student;

if (mongoose.models.Student) {
    Student = mongoose.model('Student');
} else {
    Student = mongoose.model('Student', studentSchema);
}

module.exports = Student;
