const request = require('supertest');

const server = 'http://localhost:3000';


describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      /* we return the evaluation of `request` here! It evaluates to
       a promise, so Jest knows not to say this test passes until that
       promise resolves. */
    it('responds with 200 status and text/html content type', () => request(server)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200))
  });
});



});