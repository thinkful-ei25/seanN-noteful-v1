'use strict';

const {PORT} = require('./config'); 
const morgan = require('morgan'); 
const express = require('express');

// Load array of notes
const notesRouter = require('./router/notes.router.js'); 

// Create an Express application
const app = express();

// Log all requests
app.use(morgan('common')); 

app.use('/api/notes', notesRouter); 

// Create a static webserver
app.use(express.static('public'));

// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});