var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Famous App' });
});

router.get('/examples', function(req, res, next) {
    res.render('examples');
});

router.get('/university', function(req, res, next) {
    var examples = [];

    fs.readdir(path.join(__dirname, '../public/src'), function(err, files) {
        examples = files.map(function(file) {
            return file.split('.')[0];
        });
        res.render('university', { examples: examples});
    });

});

router.get('/university/:id', function(req, res, next) {
    if (req.params.id == 'home') {
        return res.redirect('/');
    }

    res.render('famous-template', { exampleName: req.params.id});
});

router.get('/white-tile', function(req, res, next) {
    res.render('white-tile');
});

router.get('/flappy-bird', function(req, res, next) {
    res.render('flappy-bird');
});

// Tutorial routes
router.get('/slide-show', function(req, res, next) {
    res.render('slide-show');
});

router.get('/timbre', function(req, res, next) {
    res.render('timbre');
});

router.get('/sandbox', function(req, res, next) {
    fs.readdir(path.join(__dirname, '../public/sandbox'), function(err, files) {
        var appNames = [];
        examples = files.map(function(file) {
            file = file.split('.');
            if (file[1] === undefined) {
                appNames.push(file[0]);
            }
        });
        res.render('sandbox-index', {apps: appNames});
    });
});

router.get('/sandbox/:id', function(req, res, next) {
    res.render('sandbox', { app: req.params.id});
});

module.exports = router;
