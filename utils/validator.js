var JaySchema = require('jayschema');
var js = new JaySchema();

module.exports = function(app){

  function SchemaValidator(schema) {

  	return (req, res, next) => {

      let  errors = js.validate(req.body, schema);

      if(errors.length > 0) {
        app.log.error("Validation error " +  app.chalk.red('→') + " ", errors);
        let err = [];
        errors.forEach(function(error){
          err.push('validation on param "' +  error.instanceContext + '" failed. Description: ' + error.desc)
        });

        res.status(400).send({message:'validation failed', error:err})

      } else {
        next();
      }

    }

  }

  return {
    SchemaValidator: SchemaValidator
  };

};
