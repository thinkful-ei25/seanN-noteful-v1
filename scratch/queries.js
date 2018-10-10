'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    //console.error(err);
  }
  //console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    //console.error(err);
  }
  if (item) {
    //console.log(item);
  } else {
    //console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    //console.error(err);
  }
  if (item) {
    //console.log(item);
  } else {
    //console.log('not found');
  }
});

const newNote = {'id': '1011', 
  'title' : 'cheese', 
  'content' : 'cheese cheese cheese cheese cheese'}; 

notes.create(newNote, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item.title, item.content);
  } else {
    console.log('not found');
  }
}); 

notes.delete('1007', () => console.log('deleted note')); 

notes.find(1007, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});