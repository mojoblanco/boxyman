var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/baz', function(req, res) {
    res.json(req.user);
});

module.exports = router;