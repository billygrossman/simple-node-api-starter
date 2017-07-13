var conf = {};

module.exports = function(){

	conf.agenda = {}
  conf.agenda.collection = 'jobs'

	conf.db = process.env.MONGODB_URI || process.env.MONGOHQ_URL;

  conf.env = process.env.NODE_ENV;

  conf.log = {}
  conf.log.level = process.env.LOG_LEVEL;

  conf.token = {}
  conf.token.expiresInMinutes = 60;

	return conf;

}
