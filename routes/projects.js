var express = require('express');
var router = express.Router();

const Project = require('../models/Project');

/* GET project listing. */
router.get('/', function(req, res, next) {
    Project.find({}, function(err, projects) {
        res.render('projects/index', { projects: projects });
    });
});

// router.get('/create', function(req, res) {
//     var project = new Project({
//         name: 'Project 1',
//         baseUrl: 'http://google.com'
//     });

//     project.save(function(err) {
//         if (err) return handleError(err);
//         res.send('done');
//     })
// });

module.exports = router;