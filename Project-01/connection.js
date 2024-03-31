const mongoose = require("mongoose");

//connect

async function connectMongoDb(url) {
  return mongoose.connect(url); //returns a promise
}

module.exports = {
  connectMongoDb,
};

/*This code defines a function `connectMongoDb` that connects to a MongoDB database using Mongoose. Here's a summary of what's happening:

1. `const mongoose = require("mongoose");` - Importing the Mongoose library.

2. `async function connectMongoDb(url) { ... }` - Defining an asynchronous function `connectMongoDb` that takes a `url` parameter, which is the MongoDB connection URL.

3. Inside the `connectMongoDb` function:
   - `mongoose.connect(url)` - Connecting to the MongoDB database using the provided URL. This method returns a promise.
   - The function implicitly returns the promise returned by `mongoose.connect(url)`.

4. `module.exports = { connectMongoDb };` - Exporting the `connectMongoDb` function, making it available for use in other parts of the application.

This function can be used to connect to a MongoDB database using Mongoose. */
