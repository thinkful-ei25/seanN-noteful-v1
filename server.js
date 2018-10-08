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

app.get('/api/notes', (req, res) => { 
  res.json(data); 
}); 

function findNote(id){
  const item = data.find(item => item.id === Number(id)); 
  return item; 

}
app.get('/api/notes/:id', (req, res) => res.json(findNote(req.params.id))); 
