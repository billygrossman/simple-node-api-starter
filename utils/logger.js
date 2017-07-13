var winston = require('winston');
var moment = require('moment');
Papertrail = require('winston-papertrail').Papertrail;


module.exports = function(app) {

  var logger;

  winston.addColors({
  	debug: 'yellow',
  	info: 'green',
  	error: 'red'
  });

  logger = new (winston.Logger)({
  	levels: {
  		debug: 2,
  		info: 1,
  		error: 0
  	}
  });

  logger.add(winston.transports.Console, {
  	colorize: true,
  	level: app.config.log.level,
  	timestamp: moment().utc().format('YYYYMMDD-h:mmA'),
  	handleExceptions: true
  });

  if(app.config.env != 'local'){
  	logger.add(winston.transports.Papertrail, {
  		host: 'logs4.papertrailapp.com',
  		port: 16918,
  		colorize: true,
  		level: app.config.log.level,
  		timestamp: moment().utc().format('YYYYMMDD-h:mmA'),
  		handleExceptions: true
  	});
  }

  return logger;

};