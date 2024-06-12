// const fs = require('fs');

//sync... (Blocking)
// console.log("1");

// const result = fs.readFileSync("contact.txt","utf-8");
// console.log(result);

// console.log("2");

// o/p:

// 1
// Adarsh Singh
// +91111111111;
// 2


//async non-blocking
console.log("1");

 fs.readFile("contact.txt","utf-8", (err,result)=>{
  console.log(result);
 });


// console.log("2");

// // o/p:

// // 1
// // 2
// // Adarsh Singh
// // +91111111111;


// /* basically blocking operations(sync) uses thread and blocks it so other request r not attended until this one is resolved whereas
//  non-blocking operations : simple proccessing and send the result,and allow the event loop to continue processing other requests.*/

//  //default thread pool size =4;
//  //maxm? -depends upon cores 

const os = require('os');
console.log(os.cpus().length);