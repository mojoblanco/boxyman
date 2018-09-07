require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var chalk = require('chalk');

// Connect to mongodb
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true })
    .then(() => console.log(chalk.cyan('MongoDB Connected')))
    .catch(err => console.log(err));

// Routes
var indexRouter = require('./routes/indexRoutes');
var usersRouter = require('./routes/userRoutes');
var authRouter = require('./routes/authRoutes');
var projectRouter = require('./routes/projectRoutes');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middlewares
app.use(expressLayouts);
//app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/mdbootstrap/css')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/font-awesome/css')));
app.use('/font', express.static(path.join(__dirname, '/node_modules/mdbootstrap/font')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/font-awesome/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/mdbootstrap/js')));

app.use(session({
    secret: 'my-secret',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/projects', projectRouter);













// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;