var mongoose = require('mongoose');
var settings = require('../configs/settings.json');

//connect db
mongoose.connect(settings.dbpath, settings.dbopts);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	//callback
	console.log("connected!");
});
