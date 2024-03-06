const MATH = require("./math")



console.log("Hey there,from Node")
 //function name we r not using we r using variable name(MATH);
console.log(MATH)  //o/p:[Function: add]

//now after including a new fn sub also it overwrites the value
console.log(MATH)  //o/p:[Function: sub]


//so for that purpose we can use objects to return the values
//now o/p is: { add: [Function: add], sub: [Function: sub] }


//now how to specify which fn we want to use, for that

console.log(MATH.add(2,4));
console.log(MATH.sub(2,4));



// //we can destructure it also and directly use add or sub instead of MATH.add or MATH.sub

const{ add,sub } = require("./math")
console.log(add(2,3));
console.log(sub(2,3));
