"use strict";
//Working with strings Part`1

const airline = "TAP Air India";
const plane = "A321";

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log(plane[3]);

console.log(airline.length);
console.log("B727".length);

console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("India"));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const chkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s === "B" || s === "E") console.log("You got the middle seat 😭");
  else console.log("You got lucky 🤩");
};

chkMiddleSeat("11B");
chkMiddleSeat("23C");
chkMiddleSeat("3E");

console.log(airline.toLocaleLowerCase());
console.log(airline.toLocaleUpperCase());

const passenger = "jOnAS";
const passengerLower = passenger.toLocaleLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//comparing user input email
const email = "pulkitmansarovar@gmail.com";
const loginEmail = "  PulkitmansArovar@Gmail.com \n";
const normalisedEmail = loginEmail.toLowerCase().trim();
console.log(normalisedEmail);

console.log(email === normalisedEmail);

//replacing the parts of the string
const priceUS = "208,97￡";
const priceGB = priceUS.replace("￡", "$").replace(",", ".");
console.log(priceGB);

const announcement =
  "All passengers comes to boarding door 23!.Boarding door 23!";

console.log(announcement.replace("door", "gate"));
//replace all is a function but vs code is not showing it why????
// console.log(announcement.replaceAll("door", "gate"));

console.log(announcement.replace(/door/g, "gate!!"));

//Booleans
const planed = "AirBus A320neo";
console.log(planed.includes("A320"));
console.log(planed.includes("Boeing"));
console.log(planed.includes("Air"));
console.log(planed.startsWith("AirB"));

if (plane.startsWith("AirBus") && plane.endsWith("neo")) {
  console.log("Part of new AirBus family");
}

const chkBaggage = function (items) {
  const bkg = items.toLowerCase();
  if (bkg.includes("knife") || bkg.includes("gun")) {
    console.log("You are not allowed on board");
  } else {
    console.log("Welcome Aboard!");
  }
};

chkBaggage("I have a laptop,some food and a Pocket Knife");
chkBaggage("Socks and camera");
chkBaggage("Got some snaks and a gun for protections");

//split and join method in the strings
console.log("a+very+nice+string".split("+"));
console.log("Pulkit Jain".split(" "));

const [firstName, lastName] = "Pulkit Jain".split(" ");

const fullname = ["Mr.", firstName, lastName.toLocaleUpperCase()].join(" ");
console.log(fullname);

const capitatlisedName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toLocaleUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toLocaleUpperCase()));
  }

  console.log(namesUpper.join(" "));
};

capitatlisedName("tommy tuttle cruise");

//Padding the string
const message = "Go to gate 23!";
console.log(message.padStart(25, "+").padEnd(35, "+"));

console.log("Pulkit".padStart(25, "+"));

const maskCreditCard = function (number) {
  const str = number + "";
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(4337828288293727));

//repeat method
const message2 = "Bad waether.... All Departures Delyaed.. ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`there are ${n} planes in line ${"🛩".repeat(n)}`);
};
planesInLine(2);
planesInLine(5);
planesInLine(10);
