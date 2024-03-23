const mongoose = require("mongoose");

//connect

async function connectMongoDb() {
 
  return mongoose.connect("mongodb://127.0.0.1:27017/db1") //returns a promise
   
}

module.exports = {
  connectMongoDb
};