"use strict";

//selecting an element in javaScript
// console.log(document.querySelector('.message'));
const messagevar = document.querySelector(".message");
// messagevar.textContent = 'something i want to show!';
// const demo2 = messagevar.textContent;
// console.log(demo2);

// //now we well manupilate the score
// numbervar.textContent = 2;
// scorevar.textContent = 12;

// const inputfield = document.querySelector('.guess');
// inputfield.value = 20;
// console.log(inputfield.value);
// inputfield.value = 30;
//from here we are now listening to the event

//here i Defined all the selectors
const inputfield = document.querySelector(".guess");
const scorevar = document.querySelector(".score");
const numbervar = document.querySelector(".number");
const againBtn = document.querySelector(".again");
const chkBtn = document.querySelector(".check");
const body = document.querySelector("body");
const highscorevar = document.querySelector(".highscore");

//here i deifned all the variables i need in the project!
let seceretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(seceretNumber);

let score = 20;
let highScore = 0;

const updateScore = function (updatedScore) {
  scorevar.textContent = updatedScore;
};

const updateHighScore = function () {
  highscorevar.textContent = highScore;
};

const updateStyleOnWin = function () {
  body.style.backgroundColor = "#60b347";
  numbervar.style.width = "30rem";
};

const resetStyle = function () {
  body.style.backgroundColor = "#222";
  numbervar.style.width = "15rem";
};

//called the function to set the initial value
updateScore(score);

//here i wrote the login for the event listener
chkBtn.addEventListener("click", () => {
  const guess = Number(inputfield.value);
  console.log(guess, typeof guess);
  if (!guess) {
    messagevar.textContent = "✋ No number choosen ";
  } else if (guess === seceretNumber) {
    //here we gonna change some styling of the background
    updateStyleOnWin();
    numbervar.textContent = seceretNumber;
    highScore = Math.max(score, highScore);
    updateHighScore();
    messagevar.textContent = "🥳🤩yeh! correct Answer";
  } else {
    let str = "";
    if (guess > seceretNumber) {
      str = "📈 too high";
    } else {
      str = "📉 too low!";
    }
    if (score > 1) {
      updateScore(--score);
      messagevar.textContent = str;
    } else {
      updateScore(0);
      messagevar.textContent = "😭 you lost the game!";
    }
  }
});

//here we gonna implement the logic for the Again button
againBtn.addEventListener("click", () => {
  //   console.log("working here !");
  inputfield.value = "";
  seceretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(seceretNumber);
  messagevar.textContent = "start guessing..";
  score = 20;
  updateScore(20);
  resetStyle();
  numbervar.textContent = "?";
});
