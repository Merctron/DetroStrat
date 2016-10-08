#!/bin/env node

// Module Dependencies

var express = require('express');
var fs      = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

// Controllers

var mainController = require('./controllers/mainController');

var MasterApp = function() {
    var self = this;

    self.setupVariables = function() {
        self.port      = 8080;
        if (typeof self.ipaddress === "undefined") {
            self.ipaddress = "127.0.0.1";
        };
    };

    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };

    self.initializeServer = function() {
        self.app = express();
        self.app.set('views', './views');
        self.app.set('view engine', 'jade');
        self.app.use(express.static('./public'));
        self.app.use(bodyParser.urlencoded({extended: true}));
        self.app.use(bodyParser.json());

        self.app.use(session({
          name: 'sess.id',
          secret: 'detrostratsecret',
        }));

        var mainRouter = express.Router();

        mainRouter.get('/', mainController.getLandingPage);
        mainRouter.get('/cr_data', mainController.getCrData);
        mainRouter.post('/sfsubmit', mainController.insertSafeData);
        mainRouter.get('/sf_data', mainController.getSafeData);
        self.app.use('/', mainRouter);

    };

    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();
        self.initializeServer();
    };

    self.start = function() {
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
        });
    };
};

var server = new MasterApp();
server.initialize();
server.start();