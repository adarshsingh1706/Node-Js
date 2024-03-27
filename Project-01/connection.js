const mongoose = require("mongoose");

//connect

async function connectMongoDb(url) {
 
  return mongoose.connect(url) //returns a promise
   
}

module.exports = {
  connectMongoDb
};