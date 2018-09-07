var express = require('express');
var router = express.Router();

const Project = require('../models/Project');

/* GET project listing. */
router.get('/', function(req, res, next) {
    Project.find({}, function(err, projects) {
        res.render('projects/index', { projects: projects });
    });
});

router.get('/create', function(req, res) {
    res.render('projects/create');
});

router.post('/store', function(req, res) {
    var project = new Project({
        name: req.body.name,
        baseUrl: req.body.baseUrl,
        description: req.body.description,
        isPublished: (req.body.isPublished == 'on') ? true : false
    });

    project.save(function(err) {
        if (err) {
            return res.render('projects/create');
        }
        res.send('done');
    })
});

module.exports = router;