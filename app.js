const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.status(204).end();
})

module.exports = app;