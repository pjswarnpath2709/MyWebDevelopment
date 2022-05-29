'use strict'; //create visible errors 

// let variablename = `it's template form of code`;
// console.log(variablename);


let hasDriverLicense = false;

const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriverLicense) console.log("i can drive :D\n");

// const interface = 'something';

//it adds the reserved word and doen't allow to use them


//now we are gonna learn functions in javaScript 
function logger(anything) {
    console.log(anything);
}

logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `juice with ${apples} apples and ${oranges} oranges`;

    return juice;
}

const ans = fruitProcessor(10, 20);
console.log(ans, typeof ans);


//function with name - Function Declaration
//they can be used before they are defined 
function calcAge(birthYear) {
    return 2022 - birthYear;
}

let answer = calcAge(2000);
console.log(answer);

//function without a name -> Anonymous Function OR Function Expression
//they can't be used before they are defined and hence this is inline expressions
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}

answer = calcAge2(2002);
console.log(answer);

//new type of functions i.e. the Arrow functions
const calcAge3 = birthYear => 2022 - birthYear;

answer = calcAge3(2001);
logger(answer);


const yearsUntillRetairment = (birthYear, firstName) => {
    const curr_age = calcAge(birthYear);
    const retirement = 65 - curr_age;
    return `${firstName} has ${retirement} years more till retirement`;
}


logger(yearsUntillRetairment(2002, "Pulkit"));