var _ = require('lodash');

module.exports = function(app) {

  var module = {};

  var moduleName = 'Middleware';

  module.validateToken = function(req, res, next) {

    app.log.debug('Middleware ' + app.chalk.blue('→') + ' validateToken', req.headers['x-authorization-token']);

    app.models.token.methods.validate(req.headers['x-authorization-token'],(err, result) => {

      if(err) {
        app.log.error('Middleware ' + app.chalk.blue('→') + ' Error validating token');
        res.status(err.code).send({message: err.msg});
      } else {

        app.models.token.methods.refresh(req.headers['x-authorization-token'],(err, result) => {

          if(err) {
            res.status(500).send({message: 'Error refreshing token'});
          } else {
            next();
          }

        });

      }

    });

  };

  return module;

};