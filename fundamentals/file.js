
const fs = require('fs'); //built in fs modules


//synchronus
// fs.writeFileSync("./test.txt" , "Hhello world");

//async
// fs.writeFile("./test.txt" , "hello world async" ,(err)=>{});



//sync: these(sync tasks) r returning the results
// const result = fs.readFileSync("./contact.txt","utf-8"); //utf-8:encoding
// console.log(result);

//async
fs.readFile("./contact.txt","utf-8", (err,res)=>{
  if(err){
    console.log("ERROR");
  }
  else{
    console.log(res);
  }
})

//it does not returns the result as sync, directly does by storing in variable, instead it takes a callback where first parameter is err and second is result and then based on condn it gives the final ans.  


// now if we want to keep appending something in a file instead of overwriting them=>
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
//toLocaleString() bcz we want to give in string format
// so this will append new date everytime we run

// one more example
fs.appendFileSync("./test.txt", "Hey there\n");

//copy

fs.cpSync("./test.txt","./test1.txt") // this will create a new test1.txt file with contents of test.txt file.

//for deleting files

fs.unlinkSync("./test1.txt") //test1.txt deleted

//checking status of a file

console.log(fs.statSync("./test.txt"));