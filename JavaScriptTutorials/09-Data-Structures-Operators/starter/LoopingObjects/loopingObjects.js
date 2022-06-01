"use strict";

const restaurant = {
  name: "Classico Italiano",
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

const properties = Object.keys(restaurant.openingHours);

console.log(properties);

let openStr = `we are open on ${properties.length} days : `;

//Looping over the property names
for (const day of properties) {
  openStr += `${day} ,`;
}
console.log(openStr);

//for property values
const values = Object.values(restaurant.openingHours);

for (const value of values) {
  console.log(value);
}

//for all the entires
const entries = Object.entries(restaurant.openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}
