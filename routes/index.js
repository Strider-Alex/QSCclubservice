var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '首页 求是潮Clubservice' });
});

router.post('/', function(req, res, next) {
    console.log(req.body)
});

module.exports = router;
