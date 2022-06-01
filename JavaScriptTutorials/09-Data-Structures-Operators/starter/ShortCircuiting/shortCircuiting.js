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
  orderPizza: function (mainIngrediants, ...ingrediants) {
    console.log(mainIngrediants);
    console.log(ingrediants);
  },
};

//use any data type and can return anydata type

//for OR operator it works on the priciple that if the first value is truthy, it imediatly return the first value and if not return the second value
console.log("--------OR-----------");
//hence for the short note imediatly return the first truthy value
console.log(3 || "Pulkit");
console.log("" || "Pulkit");
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || "" || 1 || 3 || "Pulkit");
console.log(undefined || 0 || "" || "Hello!" || 3 || "Pulkit");

//practical example
//instead of doing this we can take advantage of the shortCircuting

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

//this will not work if restaurant.numGuests =0;
restaurant.numGuests = 23;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//for the AND operator it works on the principkle that if the first value is the falsy value then imediatly return falsy value and if not return the second value
console.log("--------AND-----------");
//hence for the short note imediatly return the first falsy value
console.log(0 && "Pulkit");
console.log(7 && "Pulkit");
console.log(7 && 23 && null && "Pulkit");

//Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "Spinach");
}

//this can be done by the following way
restaurant.orderPizza && restaurant.orderPizza("mushroom", "Spinach");
