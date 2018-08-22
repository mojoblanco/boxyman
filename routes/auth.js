var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

router.get('/login', function(req, res, next) {
    res.render('auth/login');
});

router.post('/login', function(req, res) {
    console.log(req.body);
});

router.get('/seed', function(req, res) {
    var user = new User({
        name: "Administrator",
        password: "password",
        email: "admin@admin.com",
        username: "admin"
    });

    User.create(user, function(err, user) {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.redirect('/');
        }
    });
});

module.exports = router;