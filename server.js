'use strict';

const {PORT} = require('./config'); 
const {logger} = require('./middleware/logger'); 
const express = require('express');

// Load array of notes
const data = require('./db/notes');

// Create an Express application
const app = express();

// Create a static webserver
app.use(express.static('public'));
app.use(logger); 

// Get All (and search by query)
app.get('/api/notes', (req, res) => {
  const { searchTerm } = req.query;
  res.json(searchTerm ? data.filter(item => item.title.includes(searchTerm)) : data);
});

// Get a single item
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  res.json(data.find(item => item.id === Number(id)));

});

app.get('/boom', (req, res, next) =>{ 
  throw new Error('Boom!!'); 
}); 

app.use((req, res, next) => { 
  let err = new Error('Not Found'); 
  err.status = 404; 
  res.status(404).json({message : 'No Unicorns Here!'}); 
}); 

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});




// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});