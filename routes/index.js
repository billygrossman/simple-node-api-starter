var fs = require('fs');
var path = require('path');

module.exports = function(app) {

	fs.readdirSync(__dirname).forEach(function(file) {

	  if (file !== "index.js" && path.extname(file) === '.js'){
      app.log.info('Loading route ' + app.chalk.yellow('→'), file);
	    require(path.join(__dirname,file))(app);
	  }

	});

  app.get('/up', function(req, res){
    res.sendStatus(200);
  });

};
