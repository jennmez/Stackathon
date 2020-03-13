const express = require('express');
const path = require('path');
const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
