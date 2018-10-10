'use strict'; 
const logger = ((req, res, next) => { 
  // eslint-disable-next-line no-console
  console.log(new Date(), req.method, req.url); 
  return next();  
}); 

module.exports = {logger}; 