const request = require('supertest');
const app = require('../app.js');

describe('GET /up', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

