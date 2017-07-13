const mongoose = require('mongoose');
const moment = require('moment');

module.exports = function(app) {

  const modelName = 'Token';

  const schema = new mongoose.Schema({
    token: { type: String, unique: true },
    userId: {type: String},
    expiresOn: {type: Date, default: moment().add(app.config.token.expiresInMinutes, 'minutes')}
  }, { timestamps: true });

  schema.pre('save', function(next) {

    app.log.debug('Model %s ' + app.chalk.blue('→') + ' presave', modelName, this.userId);

    this.token = require('rand-token').generate(64);

    next();

  });

  schema.methods.add = function(callback) {

    app.log.debug('Model %s ' + app.chalk.blue('→') + ' add', modelName, this.userId);

    app.models.token.schema.create(this,(err, result) => {
      if(err) {
        app.log.error('Error adding token', err);
      }
      callback(err, result);
    });

  };

  const methods = {};

  const module = {
    name: 'token',
    schema: mongoose.model('token', schema),
    methods: methods
  };


  return module;

}