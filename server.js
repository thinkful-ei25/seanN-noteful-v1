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

function findNoteBySearch(search){ 
  const item = data.filter(item => item.title.includes(search.searchTerm)); 
  
  return item; 

}

app.get('/api/notes', (req, res) => { 
  let query = req.query; 
  let search = findNoteBySearch(query); 
  res.json(search); 
}); 

function findNoteByID(id){
  const item = data.find(item => item.id === Number(id)); 
  return item; 

}
app.get('/api/notes/:id', (req, res) => res.json(findNoteByID(req.params.id))); 
