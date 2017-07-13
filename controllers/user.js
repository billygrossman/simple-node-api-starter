const _     = require('lodash');
const async = require('async');
const moment = require('moment');

module.exports = function(app){

  const Controller = {name: 'user'};

  /**
   * Add a new user into the system
   */
  Controller.add = (req, res, next) => {

    app.log.info('Controller %s ' + app.chalk.blue('→') + ' add', Controller.name);

    let user = new app.models.user.schema({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      firstName: req.body.firstName.toLowerCase(),
      lastName: req.body.lastName.toLowerCase(),
    });

    let history = new app.models.user.history.schema({
      action:'add user account',
      type:'system'
    });

    async.waterfall([

      // Add user into system
      (callback) => {

        user.add((err, result) => {
          if(err) {
            callback({status:err.code, message:err.message.toString()});
          } else {
            callback(null, result);
          }
        });

      },

      // Add history item to the user
      (user, callback) => {

        history.addHistory(user._id, function(err, result){
          if(err){
            callback(err);
          } else {
            callback(null, result);
          }
        });

      },

    ], (err, user) => {

        if (err) {
          app.log.error('Could not register user, err:', err);
          res.status(err.status).send({message: err.message});
        } else {
          res.status(200).send({message: 'user added'});
        }

    });

  };

  /**
   * User login
   */
  Controller.login = (req, res, next) => {

    app.log.info('Controller %s ' + app.chalk.blue('→') + ' login', Controller.name);

    let user = new app.models.user.schema({
      email: req.body.email.toLowerCase(),
      password: req.body.password
    });

    user.authenticate((err, result) => {

      if(err) {
        res.status(err.code).send({message:err.message});
      } else {

        // Create authentication token
        let token = new app.models.token.schema({
          userId: result._id,
          expiresOn: moment().add(app.config.token.expiresInMinutes, 'minutes')
        });

        token.add((err, result) => {

          if(err) {
            app.log.error('Could not login user, err:', err);
            res.status(500).send({message:err});
          } else {
            app.log.info('Controller %s ' + app.chalk.blue('→') + ' login Token object: ', Controller.name, result.toString());
            res.status(200).send({token: result.token, user:user});
          }

        });

      }

    });

  };

  /**
   * Get single user by id
   */
  Controller.find = function(req, res, next) {

    app.log.info('Controller %s ' + app.chalk.blue('→') + ' find', Controller.name);

    let user = new app.models.user.schema({
      _id: req.params.id
    });

    async.waterfall([

      // Get the user
      (callback) => {

        user.find(function(err, result) {
          if(err) {
            callback({status:err.code, message: err.message})
          } else {
            callback(null, result);
          }
        });

      },

    ], (err, user) => {

        if (err) {
          app.log.error('Could not find user by id, err:', err);
          res.status(err.status).send({message: err.message});
        } else {
          res.status(200).send({user:user});
        }

    });
  };

  return Controller;

};
