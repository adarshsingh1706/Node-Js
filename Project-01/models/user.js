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