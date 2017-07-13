const _         = require('lodash');
const bcrypt    = require('bcrypt-nodejs');
const mongoose  = require('mongoose');
const moment = require('moment');

module.exports = function(app) {

  const modelName = 'User';

  const historySchema = new mongoose.Schema({
    action: String,
    comments: String,
    type: { type: String, enum: ['system', 'user']},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    createdAt: { type: Date }
  });

  const schema = new mongoose.Schema({
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    history: [ historySchema ],
    password: String,
  }, { timestamps: true });

  /**
   * Password hash middleware.
   */
  schema.pre('save', function save(next) {

    const user = this;

    if (!user.isModified('password')) { return next(); }

    bcrypt.genSalt(10, (err, salt) => {

      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });

  });

  /**
   * Get user and check that password is a match
   */
  schema.methods.authenticate = function(callback) {

    app.log.debug('Model %s ' + app.chalk.blue('→') + ' authenticate', modelName, this.email);

    let password = this.password;
    let email = this.email;

    app.models.user.schema.findOne({email: email}, function(err, result) {

      if(err) {
        app.log.error('Error finding user for authentication', err);
        return callback({code: 500, message:err.toString()});
      } else if(!result) {
        app.log.error('User email not found', this.email);
        return callback({code: 404, message:'No user found'});
      } else {

        result.comparePassword(password, function(err, isMatch) {

          if (!isMatch) {
            app.log.error('Invalid password for user', email);
            return callback({code:400, message:'Invalid password'});
          } else {
            callback(null, result);
          }

        });

      }
    });

  };

  /**
   * Helper method for validating user's password.
   */
  schema.methods.comparePassword = function(password, cb) {

    app.log.debug('Model %s ' + app.chalk.blue('→') + ' comparePassword', modelName);

    bcrypt.compare(password, this.password,(err, isMatch) => {
      cb(err, isMatch);
    });

  };

  schema.methods.add = function(callback){

    app.log.info('Model %s ' + app.chalk.blue('→') + ' add', modelName, this.email);

    const self = this;

    app.models.user.schema.findOne({email: self.email}, (err, result) => {

      if(err) {
        callback({code: 400, message: err});
      } else if(result) {
        callback({code: 409, message: 'email address already exists'});
      } else {

        app.models.user.schema.create(self, (err, result) => {

          if(err) {
            app.log.error('Error creating user', err);
            callback({code: 500, message: err});
          } else {
            callback(null, result);
          }

        });

      }

    });

  };

  historySchema.methods.addHistory = function(userId, callback){

    app.log.info('Model %s ' + app.chalk.blue('→') + ' addHistory', modelName);

    this.createdAt = Date.now();

    app.models.user.schema.findByIdAndUpdate(userId, {$push:{history:this}}, {new:true, select:{password:0}}).exec((err, result) => {

      if(err){
        callback({code:500, message:err});
      } else if(!result){
        callback({code:409, message:'Could not find user'});
      } else {
        callback(null, result);
      }

    });

  };

  const methods = {};

  const module = {
    name: 'user',
    schema: mongoose.model('user', schema),
    additionalSchema: [
      {
        name:'history',
        schema: mongoose.model('history', historySchema)
      }
    ],
    methods: methods
  };

  return module;

};
