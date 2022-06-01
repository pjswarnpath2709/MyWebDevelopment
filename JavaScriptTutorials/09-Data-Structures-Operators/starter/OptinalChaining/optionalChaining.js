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
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

//with optional chaining is just the concept of the nullables in the kotlin  or Dart
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.fri?.open);

//example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day} we open at ${open}`);
}

//optional chaining on the methods
//method exists!
console.log(restaurant.order?.(0, 1) ?? "Method does not exists!");
//method does not exists!
console.log(restaurant.orderNamkeen?.(0, 1) ?? "Method does not exists!");

//Arrays
//if arrays are not empty
const users = [
  {
    name: "pulkit",
    email: "hello@pulkit.io",
  },
];

console.log(users[0]?.name ?? "user array empty");

//if arrays are empty
const users2 = [];
console.log(users2[0]?.name ?? "user2 array empty");
