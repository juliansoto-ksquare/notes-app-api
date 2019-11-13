const supertest = require('supertest');
const {expect} = require('chai');
const app = require('../app');

const testNote = {
    title: 'asdf',
    content: 'qwerty'
};

it('should return no content from root', () => {
    supertest(app)
    .get('/')
    .expect(204)
    .end((err, res) => {
        if (err) throw err;
    });
});

it('should create a new note with POST', () => {
    supertest(app)
    .post('/notes')
    .send(testNote)
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
        if (err) throw err;

        expect(res.body.note.id).to.be.ok;
        testNote.id = res.body.note.id;
        expect(res.body.note.title).to.be.equal(testNote.title);
        expect(res.body.note.content).to.be.equal(testNote.content);
    })
});

it('should GET the list of notes', () => {
    supertest(app)
    .get('/notes')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
        if (err) throw err;

        expect(res.body.notes).to.be.deep.equal([testNote]);
    })
});

it('should edit a note with PUT', () => {
    supertest(app)
    .put(`/notes/${testNote.id}`)
    .send({
        title: 'new title',
        content: 'new content'
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
        if (err) throw err;

        expect(res.body.note.title).to.be.equal('new title');
        expect(res.body.note.content).to.be.equal('new content');
        expect(res.body.note.id).to.be.ok;
    })
});

it('should DELETE a note', () => {
    supertest(app)
    .delete(`/notes/${testNote.id}`)
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
    
        expect(res.body).to.be.deep.equal({});
    })
});

it('should GET an empty array of notes', () => {
    supertest(app)
    .get('/notes')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
        if (err) throw err;

        expect(res.body.notes).to.be.deep.equal([]);
    })
})