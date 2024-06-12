const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    required:true,
    unique:true
  },
  jobTitle:{
    type:String
  },
  gender:{
    type:String,
    required:true
  }

},
 {timestamps:true} // shows in db when created, updated
)

//model
const User = mongoose.model("user",userSchema);

module.exports = User;


/*This code defines a Mongoose schema for a user and exports a model based on that schema. Here's a summary of what's happening:

1. `const mongoose = require('mongoose');` - Importing the Mongoose library.

2. Defining a Mongoose schema (`userSchema`) with the following fields:
   - `firstName`: String, required field.
   - `lastName`: String, optional field.
   - `emailId`: String, required and unique field.
   - `jobTitle`: String, optional field.
   - `gender`: String, required field.

3. `{timestamps: true}` - Adding the `timestamps` option to the schema, which automatically adds `createdAt` and `updatedAt` fields to the document, indicating when the document was created and last updated, respectively.

4. Creating a Mongoose model (`User`) based on the `userSchema`.

5. Exporting the `User` model for use in other parts of the application.

This schema and model can be used to interact with a MongoDB database to store and retrieve user information. */