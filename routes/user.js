
module.exports = function(app) {

  app.post('/user', app.controllers.user.add);

 	app.get('/user/:id', app.controllers.user.find);

  app.post('/login', app.controllers.user.login);

};
