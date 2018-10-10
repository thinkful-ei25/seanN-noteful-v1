'use strict';

const {PORT} = require('./config'); 
// const {logger} = require('./middleware/logger'); 
const morgan = require('morgan'); 
const express = require('express');

// Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB'); 
const notes = simDB.initialize(data); 

// Create an Express application
const app = express();

// Log all requests
app.use(morgan('common')); 

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());


// Get All (and search by query)
app.get('/api/notes', (req, res) => {
  const { searchTerm } = req.query;
  //res.json(searchTerm ? data.filter(item => item.title.includes(searchTerm)) : data);
  
  notes.filter(searchTerm, (err, list, next) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

// Get a single item
app.get('/api/notes/:id', (req, res) => {
  //const id = req.params.id;
  //res.json(data.find(item => item.id === Number(id)));
  const { id } = req.params; 

  notes.find(id, (err, item, next) => { 
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(item); 
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.get('/boom', (req, res, next) =>{ 
  throw new Error('Boom!!'); 
}); 

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
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