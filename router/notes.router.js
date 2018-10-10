'use strict';
const express = require('express'); 
const router = express.Router();
const data = require('../db/notes');
const simDB = require('../db/simDB');

const notes = simDB.initialize(data); 

router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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

router.put('/:id', express.json(), (req, res, next) => {
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

router.delete('/:id', (req, res, next) => { 
  const {id} = req.params; 

  notes.delete(id, (err) => { 
    if(err) { 
      res.status(500); 
      return next(err); 
    }
    res.status(204); 
    next(); 
  }); 
}); 

router.post('/', express.json(), (req, res, next) => {
  console.log('hi');
  console.log(req.body);
  const { title, content } = req.body;
  console.log(title);

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});


router.get('/boom', (req, res, next) =>{ 
  throw new Error('Boom!!'); 
}); 

router.put('/:id', (req, res, next) => {
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

router.use((req, res, next) => { 
  let err = new Error('Not Found'); 
  err.status = 404; 
  res.status(404).json({message : 'No Unicorns Here!'}); 
}); 

router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = router; 
