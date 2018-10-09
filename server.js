'use strict';

const {PORT} = require('./config'); 
const express = require('express');

// Load array of notes
const data = require('./db/notes');

// Create an Express application
const app = express();

// Create a static webserver
app.use(express.static('public'));
app.use((req, res, next) => { 
  // eslint-disable-next-line no-console
  console.log(req.method, req.url); 
  return next();  
}); 
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

// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});