var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

// Registeration
router.get('/register', function(req, res) {
    res.render('auth/register');
});

// Register user
router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    //var password2 = req.body.password2;

    // Validation
    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('username', 'Username is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();
    var errors = null;
    //var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        //checking for email and username are already taken
        User.findOne({
            username: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }
        }, function(err, user) {
            User.findOne({
                email: {
                    "$regex": "^" + email + "\\b",
                    "$options": "i"
                }
            }, function(err, mail) {
                if (user || mail) {
                    req.flash('error_msg', 'Email or username is already taken');
                    res.render('auth/register', {
                        user: user,
                        mail: mail
                    });
                } else {
                    var newUser = new User({
                        name: name,
                        email: email,
                        username: username,
                        password: password
                    });
                    User.createUser(newUser, function(err, user) {
                        if (err) throw err;
                    });
                    req.flash('success_msg', 'You are registered and can now login');
                    res.redirect('/');
                }
            });
        });
    }
});


module.exports = router;