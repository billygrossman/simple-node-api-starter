var fs    = require('fs');
var path  = require('path');

module.exports = function(app) {

  app.controllers = {};

	fs.readdirSync(__dirname).forEach(function(file) {

	  if (file !== "index.js" && path.extname(file) === '.js'){

	    var controller = require(path.join(__dirname, file))(app);
      app.log.info('Loading controller ' + app.chalk.yellow('→'), file);
      app.controllers[controller.name] = controller;

	  }

	});

};