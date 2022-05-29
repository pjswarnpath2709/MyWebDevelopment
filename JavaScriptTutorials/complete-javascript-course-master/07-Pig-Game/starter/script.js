'use strict';

//Selecting the Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //this is a bit faster
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//all the useful variables here
let currScore;
let activePlayer;
let scores;
let playing;
//the initialising function for the starting of the game
function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  currScore = 0;
  activePlayer = 0;
  updateCurrentScore(activePlayer, 0);
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
//all the functions are defined here
const updateCurrentScore = function (playedId, currentScore) {
  if (playedId == 0) {
    current0El.textContent = currentScore;
  } else {
    current1El.textContent = currentScore;
  }
};

function switchPlayer() {
  updateCurrentScore(activePlayer, 0);
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = (activePlayer + 1) % 2;
  currScore = 0;
}

init();

//rolling the dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    //generating a random rice roll
    let dicevar = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dicevar);

    //display the dice
    if (diceEl.classList.contains('hidden')) {
      diceEl.classList.remove('hidden');
    }

    diceEl.src = `dice-${dicevar}.png`;

    //chk for the dice value = 1: switch to another player
    if (dicevar != 1) {
      //add the dice to the current score
      currScore += dicevar;
      updateCurrentScore(activePlayer, currScore);
    } else {
      //switch the palyer
      switchPlayer();
    }
  }
});
//hold the current score to the total score of the player
btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if palyer's score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next palyer
      switchPlayer();
    }
  }
});

//resetting all the initial conditions
btnNew.addEventListener('click', init);
