"use strict";
const restaurant = {
  rname: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    time = "20:00",
    mainIndex = 0,
    address,
  }) {
    console.log(
      `Order recived at ${time} consisting of '${this.starterMenu[starterIndex]}' as starters and '${this.mainMenu[mainIndex]}' as main course, the order will be shipped right away to address: "${address}"`
    );
  },
};

//to destrucutre the objects we use the exact same names and curly braces
const { rname, openingHours, categories } = restaurant;
console.log(rname, openingHours, categories);

//when variables names are diffrent from property names
const {
  rname: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//setting the defualts values in the destructuring the Objects
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//mutating variables using Object Destructuring
let a = 111;
let b = 999;
console.log(a, b);

const obj = {
  a: 23,
  b: 7,
  c: 14,
};
//to overrite them we have to wrap them into the parantesis, becuase javaScript sees curly braces as the starting of a block and we can't assign something to the block
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

//power of destructuring
restaurant.orderDelivery({
  time: "12:40",
  address: "32/108,Swarn Path,Mansarovar,Jaipur",
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: "White House!",
  mainIndex: 0,
});
