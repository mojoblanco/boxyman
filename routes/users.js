var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/foo', (req, res) => {
    var user = new User({
        name: 'Barry Allen',
        username: 'barry',
        email: 'barry@allen.dev',
        password: 'password'
    });

    user.save(function(err, user) {
        if (err) return console.error(err);
        res.json(user);
    });
})

module.exports = router;