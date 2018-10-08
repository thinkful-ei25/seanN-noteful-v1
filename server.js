'use strict';



console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express'); 

// Load array of notes
const data = require('./db/notes');

const app = express(); 

app.listen(8080, function() { 
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => { 
  console.log(err);
}); 
