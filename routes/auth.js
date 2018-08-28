var express = require('express');
var router = express.Router();

var passport = require('../config/passport');
var User = require('../models/User');

// Login
router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.user = JSON.stringify(user);
            return res.redirect('/auth/success');
        });
    })(req, res, next);
});

// Registration
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

// Logout
router.get('/logout', function(req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.get('/success', function(req, res) {
    // if (req.session) {
    //     res.json(req.session.user);
    // }
    res.json("Suceess");
})

router.get('failure', function(req, res) {
    res.send('Failure');
});


module.exports = router;