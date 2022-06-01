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

const orderSet = new Set(["Pasta", "Pizza", "Pasta", "Risotto"]);

console.log(orderSet.size);

console.log(new Set("Jonas").size);

console.log(orderSet.has("Pizza"));
console.log(orderSet.has("Burger"));
orderSet.add("Garlic Bread");
orderSet.add("Garlic Bread");
console.log(orderSet);
orderSet.delete("Risotto");
console.log(orderSet);
// orderSet.clear();

//sets are also iterables
for (const order of orderSet) console.log(order);

//example
const staff = ["waiter", "chef", "manager", "waiter", "chef"];

const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);
