'use strict';

/*
 * Express Dependencies
 */
let express = require('express'),
    app = express(),
    port = 3000,
    compression = require('compression'),
    path = require('path'),
    multer = require('multer'),
    upload = multer();

/*
 * Use Handlebars for templating
 */
let exphbs = require('express-handlebars');
let hbs;

    // For gzip compression
    app.use(compression());

    /*
     * Config for Production and Development
     */
    if (process.env.NODE_ENV === 'production') {
        // Set the default layout and locate layouts and partials
        app.engine('handlebars', exphbs({
            defaultLayout: 'main',
            layoutsDir: 'dist/views/layouts/',
            partialsDir: 'dist/views/partials/'
        }));

        // Locate the views
        app.set('views', __dirname + '/dist/views');

        // Locate the assets
        app.use(express.static(__dirname + '/dist/assets'));

    } else {
        app.engine('handlebars', exphbs({
            // Default Layout and locate layouts and partials
            defaultLayout: 'main',
            layoutsDir: 'views/layouts/',
            partialsDir: 'views/partials/'
        }));

        // Locate the views
        app.set('views', __dirname + '/views');

        // Locate the assets
        app.use(express.static(__dirname + '/assets'));
    }

    // Set Handlebars
    app.set('view engine', 'handlebars');


    /*
     * Routes
     */
    // Index Page
    app.get('/', function (req, res, next) {
        res.render('index');

    });

    app.use(multer({dest:'./uploads/'}).single('fileInput'));

    app.post('/upload', upload.single(), function (req, res, next) {

        // req.file is the `avatar` file 
        // req.body will hold the text fields, if there were any 
        console.log(req.file);
        res.render('result', {
            result: req.file.size
        });

    })

    /*
     * Start it up
     */
    app.listen(process.env.PORT || port);
    console.log('Express started on port ' + port);
