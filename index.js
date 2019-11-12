const express = require('express');
const app = require('./app');
const {PORT} = process.env;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
