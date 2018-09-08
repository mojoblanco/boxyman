const passport = require('../config/passport');
const User = require('../models/User');

exports.getRegister = function(req, res) {
    res.render('auth/register');
}

exports.postRegister = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    //req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('/auth/register', {
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
                        console.log(user);
                    });
                    req.flash('success_msg', 'You are registered and can now login');
                    res.redirect('/auth/login');
                }
            });
        });
    }
}

exports.getLogin = function(req, res) {
    res.render('auth/login');
};

exports.postLogin = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/');
    };

exports.logout = function(req, res) {
    req.logout();
    req.session.destroy(function(err) {
        res.redirect('/auth/login');
    });
};