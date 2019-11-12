const supertest = require('supertest');
const {expect} = require('chai');
const app = require('../app');

it('should return no content from root', () => {
    supertest(app)
    .get('/')
    .expect(204)
    .end((err, res) => {
        if (err) throw err;
    });
})