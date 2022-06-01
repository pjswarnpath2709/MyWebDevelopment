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

const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze Italy");
console.log(rest.set(2, "Lisbon ,Portugal"));

//calling the set method always retuns the updated map hence we could update maps using chaining
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "we are closed :(");
console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));
const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories"));
rest.delete(2);
console.log(rest);
console.log(rest.size);
// rest.clear();
const arr = [1, 2];
rest.set(arr, "Test");
console.log(rest.get(arr));
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);

//another way of inputing values in maps
const questions = new Map([
  ["question", "What is the best Programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🥳"],
  [false, "Try agian!😅"],
]);
console.log(questions);

//conert Objects to map
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);

//maps are also iterables and hence has we can use for-of loops on them

//quiz App
console.log(questions.get("question"));
for (const [key, values] of questions) {
  if (typeof key === "number") console.log(`Answer ${key}: ${values}`);
}
const answer = Number(prompt("Your answer"));
console.log(questions.get(answer == questions.get("correct")));

//convert map to arrays
console.log([...questions]);
console.log([...questions.keys()]);
console.log([...questions.entries()]);
console.log([...questions.values()]);
