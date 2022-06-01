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

//it has the same syntax as the spread operator but it does the oposite of the spread operators
//it collect all the elements and pack elements into an arrays

//SPREAD , beacuse on the right side of the assignment operators
const arr = [1, 2, ...[3, 4]];

//REST , beacuse on the left side of the assignment variables -> doesnot include any skipped elements hence REST elemenrts always be the last element , there can be only one REST in the destructuing format
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(others);

const [pizza, , risotto, ...otherfood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherfood);

//REST for the Objects , remaining elements will be collected into new Object rather than arrays

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//Power of Rest Opeartors in the functions

//REST parameters
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};
console.log(add(2, 3));
console.log(add(2, 3, 4));
console.log(add(2, 3, 4, 5, 5, 6, 6, 7, 7, 6, 7));

const x = [23, 5, 7];
console.log(add(...x));

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("pasta");
