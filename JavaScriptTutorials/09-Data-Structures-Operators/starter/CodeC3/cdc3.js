"use strict";
///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the gameEvents and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);
// Task 1.
const duplicateEvents = [...gameEvents.values()];
console.log(duplicateEvents);

const events = [...new Set(duplicateEvents)];
console.log(events);

// Task 2.
gameEvents.delete(64);
console.log(gameEvents.has(64));

const total_time = [...gameEvents.keys()].pop();
// Task 3.
console.log(
  `An event happend,on an average ,every ${
    total_time / gameEvents.size
  } minutes`
);

// Task 4.
for (const [time, eve] of gameEvents) {
  if (time <= 45) {
    console.log(`[FIRST HALF] ${time} : ${eve}`);
  } else {
    console.log(`[SECOND HALF] ${time} : ${eve}`);
  }
}
