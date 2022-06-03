"use strict";

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/* 

// Part 1 : Default parametes
const bookingArr = [];

const createBooking = function (
  flightNumber,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 way of default values
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNumber,
    numPassengers,
    price,
  };
  console.log(booking);
  bookingArr.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 5);

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/*

// Part 2 : How Passing arguments works: value vs reference

const flight = 'LH234';
const Pulkit = {
  fullname: 'Pulkit Jain',
  passport: 234567889,
};

const chkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.fullname = 'Mr. ' + passenger.fullname;

  if (passenger.passport === 234567889) {
    alert('Check In');
  } else {
    alert('Wrong passport');
  }
};

chkIn(flight, Pulkit);
console.log(flight); // same works as Java , primitve type is passed in the function hence it's copy will be created
console.log(Pulkit); //same works as Java , Refrence type is passed in the function argument

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(Pulkit);
chkIn(flight, Pulkit);

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/*

// Part 3: First-Class and Higher-Order Functions

// HigherOrderFunctions : functions that recieves another function as an argument , that returns a new function , or both 

//1.) functions that recies another function as an argument 
// eg.  .addEventListner("click",callback_function) here the callback_function is function called by the addEventListner function while executing 

//2.) functions that returns another functions
// 
// function count() {
//   let counter = 0;
//   return function () {
//     counter++;
//   };
// }
// 


*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/* 

// Part 4: Functions Accepting CallBack Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher-Order function
const transformer = function (str, fn) {
  console.log(`Original string : ${str}`);
  console.log(`Transformed string : ${fn(str)}`);
  console.log(`Transformed by : ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is not a best language!', oneWord);

const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);
['Pulkit', 'Tanya', 'Me'].forEach(high5);

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/*
// Part 5 : Functions Returning Functions
const greet = function (greeting) {
  return function (fullName) {
    console.log(`${greeting}, ${fullName}`);
  };
};

const greeterHey = greet("hey how are you doing!");

// calling the function
greeterHey("Pulkit");
greeterHey("Tanya");
greet("Hey")("Pulkit");

// function returning as arrow functions
const greetArrow = (greeting) => (fullName) =>
  console.log(`${greeting}, ${fullName}`);

greetArrow("Hi")("Pulkit");

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/*

// Part 6 : the Call and Apply methods
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, fullName) {
    console.log(
      `${fullName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      fullName,
    });
  },
};

lufthansa.book(239, "Pulkit Jain");
lufthansa.book(635, "Jhon Smith");
console.log(lufthansa);

const indWings = {
  airline: "IndianWings",
  iataCode: "IW",
  bookings: [],
};

//the this ley word of the regular function is undefined in the strict mode hence we are getting an error here for calling the book
const book = lufthansa.book;

// DOES NOT WORK
// book(23, "Sarah Williams");

//now we will learn how to tell javaScript the new value at which this keyword should point , this can be done in three ways by using Call,Apply and Bind
book.call(indWings, 23, "Sara Williams");
console.log(indWings);

book.call(lufthansa, 239, "Mary Copper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Peter Parker");

// Apply method -> does`nt recives a list of arguments as call keyword
const flightData = [583, "George Daisie"];
book.apply(swiss, flightData);
console.log(swiss);

// Better way of doing exact same thing
book.call(swiss, ...flightData); //always use the call method as it is easy

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/*

// Part 7 : The Bind Method
// diffrence is that bind returns a new function which has a this keyword as bounded to our set value
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, fullName) {
    console.log(
      `${fullName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      fullName,
    });
  },
};
const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

const book = lufthansa.book;
const indWings = {
  airline: "IndianWings",
  iataCode: "IW",
  bookings: [],
};

// book.call(indWings, 23, "Sara Williams");
// console.log(indWings);

const bookIW = book.bind(indWings);
const bookLH = book.bind(lufthansa);
const bookSwis = book.bind(swiss); //this set the new functions this lkeyword permantly as the indWings , the name of the new fun ction we specified to bookIW
bookIW(23, "Steven Williams");

//Creating function for  specific arguments
const bookIW23 = book.bind(indWings, 23); //this function is set to always call book with this as IndWings and the flightNumber as 23
//hence this function already has flightNumber hence it only needs a name
bookIW23("Pulkit Jain");
bookIW23("Tanya Khandelwal");

//with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

const btn = document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa)); //inside of the event Handller hence here the this key word is set to the element with with the event listener is attached to, hence if we specify the this key word manually using bind

//Partial Apllication :  pre setting the parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23);
console.log(addVat(100));

// Challenge
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addTaxVAT2 = addTaxRate(0.23);
console.log(addTaxVAT2(100));
console.log(addTaxVAT2(23));

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/* 


// Part 8 : Coding Challenge
// Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.
Here are your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
HINT: Use many of the tools you learned about in this and the last section 😉
BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?
BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
GOOD LUCK 😀

*/
/*
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer(type) {
    const option = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write Option Number)`
      )
    );
    typeof option === "number" &&
      option < this.answers.length &&
      this.answers[option]++;

    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

const btn = document.querySelector(".poll");
console.log(btn);
btn.addEventListener("click", poll.registerNewAnswer.bind(poll));

// [5,2,3]  [1,5,3,9,6,1]
poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/*

// part 9 : Immediately invoked function expressions
// functions that are run once in the code and are immediately delted

const runOnce = function () {
  console.log("this will never run again");
};
runOnce();

// this is what we call tricking javaScript , by paranthysing the function without a name
(function () {
  console.log("this will never run again!");
})();

(() => console.log("this will also never run again"))();

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/* 

// part 10 : Closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();
console.dir(booker);

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/*

// PART 11: more Examples on closures

//Example 1
let f;
console.dir(f);
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
//reassigning f function
h();
f();
console.dir(f);

//Example 2
const boardPassenger = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`we are boarding all ${n} passengers`);
    console.log(`there are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`will start boarding in ${wait} seconds`);
};

boardPassenger(100, 3);

*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓
Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!
And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
GOOD LUCK 😀
*/

/*
(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
*/

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
