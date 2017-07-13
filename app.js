/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Create Express server.
 */
const app = express();

/**
 * Configurations
 */
app.config = require('./config/master')();

/**
 * Logging
 */
app.log = require('./utils/logger')(app);
app.chalk = require('chalk');

/**
 * Middleware
 */
app.middleware = require('./utils/middleware')(app);

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  app.log.error(err)
  app.log.info('%s MongoDB connection error. Please make sure MongoDB is running.', app.chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());


// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });


require('./models')(app);
require('./controllers')(app);
require('./routes')(app);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  app.log.info('%s App is running at http://localhost:%d in %s mode', app.chalk.green('✓'), app.get('port'), app.get('env')); 
  app.log.info('  Press CTRL-C to stop\n');
});

module.exports = app;
