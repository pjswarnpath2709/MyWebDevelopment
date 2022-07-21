'use strict';
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
//LECTURE -1 ,CONSTRUCTOR FUNCTION
/*

// steps that take place due to new keyword
 * 1. New {} is created
 * 2. function is called, this = {}
 * 3. {} linked to protoype
 * 4. function automatically return {}
 * 
 const Person = function (firstName, birthYear) {
  //constructor function
  this.firstName = firstName;
  this.birthYear = birthYear;

  //adding methods  --- never create methods inside of the constructor function (bad pracrice)
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};
const jonas = new Person('Jonas', 1991); //constructor function called via , new keyword
const matilda = new Person('Matilda', 2002); //constructor function called via , new keyword
const jack = new Person('Jack', 2001); //constructor function called via , new keyword
console.log(jonas, matilda, jack);

const jay = 'jay';

console.log(jonas instanceof Person, jay instanceof Person);
 */

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE -2 , PROTOTYPES

/**  
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
jonas.calcAge(); // we have access to it beacuse of the prototypal inheritance
console.log(jonas.__proto__); // jonas ka prototype is Person.prototype but,
console.log(Person.prototype === jonas.__proto__);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person)); // Person ka prototype kuch aur hai
// we can also set properties on the protoypes
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);
console.log(jonas.hasOwnProperty('firstName')); // it's , his own property
console.log(jonas.hasOwnProperty('species')); // it is a prototypal inherited property
*/
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE-3, THE PROTOTYPE CHAINING
/*

console.log(jonas.__proto__);
//Object.prototype (top of the prototype chain)
console.log(jonas.__proto__.__proto__); // prototype property of the object
console.log(jonas.__proto__.__proto__.__proto__); //this will return the null
console.dir(Person.prototype.constructor); //this will point back to the Person itself
//prototype of arrays
const arr = [1, 2, 3, 4, 5, 5, 65, 65, 9, 9, 5, 4, 3, 2, 2, 4, 45, 3, 2];
console.log(arr.__proto__); //this will print the Array.prototype
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__); //this will print Object.prototype
// Adding new Property to the array prototype so that we could call it on any object linked to it
//not so good idea, so we can't do it anyway
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
const h1 = document.querySelector('h1');
console.dir(h1);
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE -4 ,CODING CHALLENGE
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
mercedes.brake();
bmw.brake();
mercedes.accelerate();
*/

//////+++++++++++++++++++++++++++++++++++++++++//////

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE-5 , ES6 CLASSES
/*
* 1. classes are not Hoisted , i.e. --> they cannot be used before they are not declared just in the case of declared functions

* 2. just like functions , classes are also functions i.e. --> we can pass them into functions and return them from the functions 

* 3. classes are always executed in the strict mode only

//class expression
// const PersonClExp = class {};

//class declaration
class PersonClDec {
  //first thing to do is add constructor
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  //this methods by default will be on the Prototype of the Class and not on the class Itself
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`hey ${this.firstName}`);
  }
}

// PersonClDec.prototype.greet = function () {
//     console.log(`hey ${this.firstName}`);
// };

const jessica = new PersonClDec('Jessica', 1991);
console.log(jessica);
console.log(jessica.__proto__ === PersonClDec.prototype);
jessica.greet();

*/
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// LECTURE-6, SETTERS AND GETTERS
/**
 * 
 const account = {
  owner: 'jonas',
  movement: [28, 23, 39, 92],

  get latest() {
    return this.movement.slice(-1).pop();
  },

  //requires only one parameter
  set latest(mov) {
    this.movement.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movement);

class PersonClDec {
  //first thing to do is add constructor
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //this methods by default will be on the Prototype of the Class and not on the class Itself
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`hey ${this.fullName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  //try to set a property which already exists
  //jis cheej ka setter bana rahe ho us cheej ka getter bhi bana lena chaiye
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else {
      alert(`${name} is not a fullname man`);
    }
  }

  get fullName() {
    return this._fullName;
  }
}
const pulkit = new PersonClDec('Pulkit Jain', 2002);
const walter = new PersonClDec('Walter', 1965);

console.log(pulkit.fullName);
 */

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE-7 , STATIC METHODS, functions available on the constructor itself , but not on instances
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// adding constructor function to Person
Person.hey = function () {
  console.log('hey there');
  console.dir(this);
};
Person.hey();

//on the class declaration method

class PersonDec {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  //instance methods
  calcAge() {
    console.log(2002 - this.birthYear);
  }

  //static methods are added using the keyword static
  static hey() {
    console.log('Hey there how do you doing');
    console.dir(this);
  }
}

PersonDec.hey();
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE -8 , USING A FUNCTION CALLED OBJECT.Create()

/*
// it is a prototype
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); //Object.create() accepts an another Object which is treated as a prototype for the steven , now the steven.__proto__ will be set as PersonProto and it will have access to all the properties in the PersonProto
steven.name = 'Steven';
steven.birthYear = 2002;
console.log(steven);
steven.calcAge();

const sarah = Object.create(PersonProto);
console.log(sarah);
sarah.init('Sarah', 2000);
sarah.calcAge();

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// LECTURE -9 , Coding challenge 2

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/
/* 
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  //instance function
  brake() {
    this.speed -= 5;
  }

  //instance function
  accelerate() {
    this.speed += 10;
  }

  //getter function
  get speedUS() {
    return this.speed / 1.6;
  }

  //setter function --> always need to take exactly one param
  set speedUS(speedinmi) {
    this.speed = speedinmi * 1.6;
  }
}

const ford = new Car('Ford', 120);
console.log(ford.speedUS, ford.speed);
ford.accelerate();
console.log(ford.speedUS, ford.speed);
ford.brake();
console.log(ford.speedUS, ford.speed);

ford.speedUS = 1000;
console.log(ford.speed);
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE-10 , INHERITANCE BETWEEN DIFFRENT CLASSES(PROTOTYPES , ACTUALLY)
//INHERITANCE WITH CONSTRUCTOR FUNCTIONS
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  //.call() takes first argument as the object or thing that has to be set as the this for that given function, becuase regular functions have this keywords as undefined
  Person.call(this, firstName, birthYear);
  this.course = course;
};
//Linking the prototyoes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(
    `Hello, My name is ${this.firstName} and i am studing ${this.course}`
  );
};

const mike = new Student('Mike', 2002, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike);

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
// an error in the constructor function
console.dir(Student.prototype.constructor);
//fixing the constructore function for the Student
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// LECTURE -11 , CODING CHALLENFGE
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

//Link the prototypes
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h  with a charge of ${this.charge}`
  );
};
EV.prototype.brake = function () {
  this.speed -= 0;
  this.charge += 0;
  console.log(
    `${this.make} is going at ${this.speed} km/h  with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// LECTURE-12, USING ES6 CLASSES FOR THE INHERITENCE
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //instance methods
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name !`);
  }

  get fullName() {
    return this._fullName;
  }

  //static methods are added using the keyword static
  static hey() {
    console.log('Hey there how do you doing');
    console.dir(this);
  }
}

class StudentCl extends PersonCl {
  //constructor method
  constructor(fullName, birthYear, course) {
    // just like the c++ and Java, Always need to happen first -- > after that only this keyword is accessible
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this._fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `i am ${
        2022 - this.birthYear
      } years old, but as a Student I feel more like ${
        2022 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2001, 'Computer Science');
martha.introduce();
martha.calcAge();
console.log(martha);

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// LECTURE-13, USING THE OBJECT.CREATE() METHOD

/* 

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.init('Steven Clark', 2002);

//LINKING THE PROTO'S
const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
console.log(jay);
jay.introduce();
jay.calcAge();

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// LECTURE-14, FEW THINGS NEED TO BE LEARNED EXTRA IN THE CLASSES

/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log('Thanks for Opening an Account');
  }

  //Public interface of our Object
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }
  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1.approveLoan(1000); // not even be allowed to access this kind of methods, outside the class

console.log(acc1.pin); //accessible from outside

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE-15, DATA ENCAPSULATION AND ABSTRACTION (NOT TRUELY)

/*

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    //not truely private but protected proerty
    this._movements = [];
    this.locale = navigator.language;

    console.log('Thanks for Opening an Account');
  }

  //Public interface of our Object

  getMovements() {
    return this._movements;
  }

  getPin() {
    return this._pin;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }
  _approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// acc1.approveLoan(1000); // not even be allowed to access this kind of methods, outside the class

// console.log(acc1.pin); //accessible from outside
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//LECTURE-16, TRUELY PRIVATE FEIDS AND METHODS

// at the given time , the javascript does'nt have the proper implementtations of classes
// a given praposals are made of k/a CLASS FIELDS which are available to use as Beta version of Js
// these CLASSFEILDS has four members
/*
1. Public Feilds
2. Private Feilds
3. Public Methods
4. Private Methods

// there also static versions of all of the above 

class Account {
  // 1) --> defining a public feild  {availability: instances}
  locale = navigator.language;
  static time = new Date();

  // 2) --> defining private feilds  {availability: instances}
  #movements = [];
  #pin;

  // 3) --> defining public methods {availability: prototype}

  // 4) --> defininf Private Methods {availability: }
  #approveLoan(val) {
    return true;
  }

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //not truely private but protected proerty
    // this._movements = [];
    // this.locale = navigator.language;

    console.log('Thanks for Opening an Account');
  }

  //Public interface of our Object

  getMovements() {
    return this.#movements;
  }

  getPin() {
    return this.#pin;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
  }

  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1.getMovements());
console.log(acc1.getPin());
acc1.requestLoan(1000);
Account.helper();
console.log(Account.time.getTime());

// console.log(acc1.#approveLoan(200));  --> treated as a private field , not private method

// acc1.approveLoan(1000); // not even be allowed to access this kind of methods, outside the class

// console.log(acc1.pin); //accessible from outside
// console.log(acc1.#movements);

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// LECTURE - 17, CHAINING METHODS

/*

class Account {
  // 1) --> defining a public feild  {availability: instances}
  locale = navigator.language;
  static time = new Date();

  // 2) --> defining private feilds  {availability: instances}
  #movements = [];
  #pin;

  // 3) --> defining public methods {availability: prototype}

  // 4) --> defininf Private Methods {availability: }
  #approveLoan(val) {
    return true;
  }

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //not truely private but protected proerty
    // this._movements = [];
    // this.locale = navigator.language;

    console.log('Thanks for Opening an Account');
  }

  //Public interface of our Object

  getMovements() {
    return this.#movements;
  }

  getPin() {
    return this.#pin;
  }
  //making deposit chainable
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1.getMovements());
console.log(acc1.getPin());
acc1.requestLoan(1000);
//Chaining
acc1
  .deposit(200)
  .deposit(100)
  .deposit(300)
  .withdraw(200)
  .withdraw(29)
  .requestLoan(2000);
console.log(acc1.getMovements());
Account.helper();
console.log(Account.time.getTime());

// console.log(acc1.#approveLoan(200));  --> treated as a private field , not private method

// acc1.approveLoan(1000); // not even be allowed to access this kind of methods, outside the class

// console.log(acc1.pin); //accessible from outside
// console.log(acc1.#movements);

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
// LECTURE - 18, CODING CHALLENGE
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!
DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(rivian.speedUS);
