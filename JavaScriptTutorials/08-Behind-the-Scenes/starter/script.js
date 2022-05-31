'use strict';

/*
//SCOPING IN THE JAVAscript

function calcAge(birthYear) {
  const age = 2022 - birthYear;
  //   console.log(firstName);
  function printAge() {
    let output = `${firstName}, you are ${age} year-old, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 2000 && birthYear <= 2004) {
      var millenial = true; //var variables have the scope of a function, they simply ignore the block scope

      //this variable is now made available to the block scope only hence look-Up will find it first
      const firstName = 'Steven'; //this is totaly different variables , just name are same

      //reassigning outer space variables
      output = 'New Output!';
      const str = `oh, and you are a millenial ,${firstName}`;
      console.log(str);

      //this function is also now a block scoped but only in strict mode
      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial);
    // console.log(add(a,b)); only works in the non-strict mode
    console.log(output);
  }
  printAge();
  return age;
}

const firstName = 'Pulkit';
calcAge(2002);
 */

/*
//HOISTING IN JAVAscript
//variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Pulkit';

//above this the TDZ for the job is here
let job = 'student';

//above this the TDZ for the year is here
const year = 2002;

//Functions
console.log(addDecl(2, 3)); //we are able to call it
console.log(addExpr(2, 3)); //we cant access is before declaration

console.log(addArrow(2, 3)); //we cant access , before declaration

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};
//if we use var it will be set to undifined and hence when we will call this we will get an error that it is not a function
var addArrow = (a, b) => a + b;
*/
/*
var x = 20;
let y = 30;
const z = 40;
console.log(x === window.x); //winodw is the globAL VARIABLE
console.log(y === window.y);
console.log(z === window.z);

*/

/*
//THIS KEYWORD
console.log(this);

const calcAge = function (birthYear) {
  console.log(2022 - birthYear);
  console.log(this);
};
calcAge(2002);

const calcAgeArrow = birthYear => {
  console.log(2022 - birthYear);
  console.log(this); //arrow function does'nt get it's own this and hence uses the this of the parent hence uses lexical scope
};
calcAgeArrow(2002);

const calcAgeComplex = function (birthYear) {
  console.log(2022 - birthYear);
  console.log(this, 'this of parent function ');
  const printAge = firstName => {
    console.log(`${firstName}, you are here`);
    console.log(this, 'this of arrow function');
  };
  printAge('Pulkit');
};
calcAgeComplex(2002);

const Pulkit = {
  year: 2002,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year);
  },
};

Pulkit.calcAge();

const Tanya = {
  year: 2001,
};

Tanya.calcAge = Pulkit.calcAge;
Tanya.calcAge();

const f = Tanya.calcAge;

f();

*/

/*

//DIFFRENCE BETWEEN REGUALR AND ARROW FUNCTION

var firstName = 'Tanya';

const Pulkit = {
  //the Object doesn't have their own scope all the variables in the object have glbal scope
  firstName: 'Pulkit',
  year: 2002,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year);

    //SOLUTION 1 : USE AN EXTRA VARIABLE
    // const self = this; //solution to the isMillineal problem

    // //this key word for the regular function is undefined
    // const isMillineal = function () {
    //   //   console.log(this, 'this of isMillineal');
    //   console.log(self, 'this of isMillineal');

    //   //   console.log(this.year >= 2000 && this.year <= 2004);
    //   console.log(self.year >= 2000 && self.year <= 2004);
    // };
    // isMillineal();

    //SOLUTION 2 : USE ARROW FUNCTIONS
    //beacuse the arrow function has the this keyword of the parent function hence we will use arrow functions inside a method

    //this key word for the regular function is undefined
    const isMillineal = () => {
      //   console.log(this, 'this of isMillineal');
      console.log(this, 'this of isMillineal');
      //   console.log(this.year >= 2000 && this.year <= 2004);
      console.log(this.year >= 2000 && this.year <= 2004);
    };
    isMillineal();
  },
  //parent scope of the greet function is global

  greet: () => {
    //so here this is the winodw object in the ARROW functions
    console.log(this);
    console.log(`hey ${this.firstName}`);
  },
};
Pulkit.greet();
Pulkit.calcAge();
*/

/* 
//ARGUMENTS  KEYWORD , IT IS ONLY AVAILABLE IN THE REGULAR FUNCTION

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(10, 23);
const addArrow = (a, b) => {
  //   console.log(arguments);
  return a + b;
};
// addArrow(2, 5);
*/

/*

//PRIMITVE DATATYPES AND OBJECTS
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);
//Objects are stored as refrece in the memory
//here me is a reference to the object with some proert
const me = {
  firstName: 'Pulkit',
  age: 20,
};

//now the friend is new refrence for the same object as me
const friend = me;
friend.age = 22;
console.log('Friend : ', friend);
console.log('Me ', me);

//primitive types
let lastName = 'Khandelwal';
let OldLastName = lastName;
lastName = 'Jain';
console.log(lastName, OldLastName);

//reference types
const Insaan = {
  firstName: 'Insaan',
  lastName: 'Baniya',
  year: 2001,
};

const marriedInsaan = Insaan;
marriedInsaan.lastName = 'Jain';
console.log('Before marriage : ', Insaan);
console.log('After marriage :', marriedInsaan);

//copying the objects shallowily
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  famil: ['Alice', 'Bob'],
};

//Object.assign is a shallow copy and hence does not copy on the deep level i.e. if there is any another InnerObject inside of the Object then the two copies will share the same InnerObject reference
const jessicaCopy = Object.assign({}, jessica);
jessicaCopy.famil.push('Mary', 'Jhon');
jessicaCopy.lastName = 'Davis';
console.log(jessica);
console.log(jessicaCopy);

//copying the objects on the deep level
//it's beyond the scope of the current videos

*/
