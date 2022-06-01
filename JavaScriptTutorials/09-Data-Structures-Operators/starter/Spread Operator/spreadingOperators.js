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

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}!`
    );
  },
};

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//spread operator simply takes values out of the array and put it into parent array
//spread operators gives multiples values spreaded by the commas

const goodNewArr = [1, 2, ...arr];
console.log(goodNewArr);
console.log(...goodNewArr);

const newMenu = [...restaurant.mainMenu, "Gnocci", "Samosa", "Idli"];
console.log(...newMenu);

//Copy array - shallow
const mainMenuCopy = [...restaurant.mainMenu];

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

console.log(menu);

//Iterables are arrays , strings ,maps and sets but not the objects

//Strings are also iterables
const str = "Pulkit";
const letters = [...str, , "J."];
console.log(letters);
console.log(...str);

//power of spread operator
const ingrediants = [
  prompt("let's make the pasta! Ingrediant 1"),
  prompt("Ingredient 2?"),
  prompt("Ingrediant3?"),
];
console.log(ingrediants);

restaurant.orderPasta(...ingrediants);

//Real-World Examples ,Spread operartor on objects

const newResturant = {
  ...restaurant,
  founder: "Pulkit",
  date: "15th November",
  time: "12:00",
};
console.log(newResturant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Pulkit ka Dabha!";

console.log(restaurant.name);
console.log(restaurantCopy.name);
