const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cuid = require('cuid');

const notes = [];

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.status(204).end();
})

app.post('/notes', (req, res, next) => {
    const {title, content} = req.body;

    const note = {
        title,
        content,
        id: cuid()
    };

    notes.push(note);

    res.status(201).json({note});
});

app.get('/notes', (req, res, next) => {
    res.json({notes});
})

app.put('/notes/:id', (req, res, next) => {
    const {id} = req.params;
    const {title, content} = req.body;
    const index = notes.map(note => note.id).indexOf(id);

    if (index === -1) res.status(404).json({});

    const note = notes[index];

    note.title = title;
    note.content = content;

    res.json({note});
});

app.delete('/notes/:id', (req, res, next) => {
    const {id} = req.params;
    const index = notes.map(note => note.id).indexOf(id);

    if (index === -1) res.status(404).json({});
    
    notes.splice(index, 1);

    res.status(200).json({});
});

module.exports = app;