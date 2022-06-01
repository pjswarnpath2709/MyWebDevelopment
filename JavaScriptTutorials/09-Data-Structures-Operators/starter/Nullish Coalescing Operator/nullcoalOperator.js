"use-strict";
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

restaurant.numGuest = 0;
const guest1 = restaurant.numGuest || 10;
console.log(guest1);

// work with the principle of the Nullish values : null and undefined and does not include 0 and ''

//hence the short circuiting is done on the Nullish Values
const guestCorrect = restaurant.numGuest ?? 10;
console.log(guestCorrect);
