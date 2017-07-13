var fs = require('fs');
var path = require('path');

module.exports = function(app) {

  app.models = {};

	fs.readdirSync(__dirname).forEach(function(file) {

	  if (file !== "index.js" && path.extname(file) === '.js'){

      app.log.info('Loading model ' + app.chalk.yellow('→'), file);

      var model = require(path.join(__dirname, file))(app);
      app.models[model.name] = {};
      app.models[model.name].schema = model.schema;
      app.models[model.name].methods = model.methods;

      if("additionalSchema" in model) {

        model.additionalSchema.forEach(function(additionalSchema){
          app.log.info('  ' + app.chalk.yellow('↳') +'  additional model schema >', additionalSchema.name);
          app.models[model.name][additionalSchema.name] = {};
          app.models[model.name][additionalSchema.name].schema = additionalSchema.schema;
        });

      }

	  }

	});

};
