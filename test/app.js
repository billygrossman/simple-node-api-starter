const request = require('supertest');
const app = require('../app.js');

describe('Check that system is running', () => {

  it('should return 200 OK', (done) => {
    request(app)
      .get('/up')
      .expect(200, done);
  });

});

