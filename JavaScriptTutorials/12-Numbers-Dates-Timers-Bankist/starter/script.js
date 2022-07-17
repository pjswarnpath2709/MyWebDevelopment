'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-07-11T23:36:17.929Z',
    '2022-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const calcDaysPassed = (date1, date2) => {
  let daysPassed = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  return Math.round(daysPassed);
};
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formatamount = formatCur(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = formatamount;
};
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const updateUI = function (acc) {
  const newDate = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'short',
  };
  const locale = acc?.locale;

  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
    newDate
  );

  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

const startLogOutTimer = function () {
  const tick = function () {
    //call the timer every second

    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(Math.trunc(time % 60)).padStart(2, 0);
    //in each callback call print tne remaining time to Ui
    console.log(`${min}:${seconds}`);
    labelTimer.textContent = `${min}:${seconds}`;
    //When the timer go to zero just do a logout
    if (time === 0) {
      clearInterval(myInterval);

      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //decrease 1 sec
    time--;
  };
  // set time to 5 minutes
  let time = 300;
  tick();
  const myInterval = setInterval(tick, 1000);
  return myInterval;
};

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Event handlers
let currentAccount, timer;
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //if there exists a timer then remove it and then start a new timer
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //add tranfer dates to movementDates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      //add tranfer dates to movementDates
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      //reset the timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/** Lecture -1   about numbers  
 * 
 * 
 * 
//conversions
console.log(23 === 23.0);
console.log(+'23');

//parsing
console.log(Number.parseInt('30', 10));
console.log(Number.parseFloat('40.99rem'));

//isNaN
console.log(Number.isNaN(20), 'is this not a number');
console.log(Number.isNaN('20'), 'is this not a number');
console.log(Number.isNaN(+'20X'), 'is this not a number');
console.log(Number.isNaN(20 / 3), 'is this not a number');

//isFinite - better way then isNan
console.log(Number.isFinite(20));
console.log(Number.isFinite('20')); //string is treated as NaN
console.log(Number.isFinite(20 / 0));

//isInteger
console.log(Number.isInteger(20));
console.log(Number.isInteger(20.0));
console.log(Number.isInteger('20')); //string is treated as NaN
console.log(Number.isInteger(20 / 0));

*/
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/**
 *
 * Lecture -2 , All about Math class and rounding
 * //sqrt
console.log(Math.sqrt(25));
console.log(8 ** (1 / 3));

//max and min
console.log(Math.max(5, 18, 3, 11, 20));
console.log(Math.max(5, '18', 3, 11, 20));
console.log(Math.max(5, '18px', 3, 11, 20));

console.log(Math.min(3, 5, 67, 90, 89));
console.log(Math.min(3, 5, 67, 90, '89'));
console.log(Math.min(3, 5, 67, 90, '89px'));

//some constants in the Math class
console.log(Math.PI * Number.parseFloat('10px') ** 2);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}; // 0..1*(max-min) -> 0..(max-min) + min -> min...(max)

console.log(randomInt(10, 20));

//rounding integers
console.log(Math.trunc(20.9));
console.log(Math.round(24.009));
console.log(Math.ceil(24.09));
console.log(Math.floor(24.09));

//rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(1));
console.log((2.7).toFixed(2));
console.log((2.7).toFixed(3));

 */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/**
 *
 * Lecture -3 , the reminder operator
 * //remainder operator
console.log(5 % 2);

//even odd logic
const isEven = function (number) {
  if (number % 2 === 1) {
    // console.log('odd');
    return false;
  } else {
    // console.log('even');
    return true;
  }
};

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (isEven(i)) {
      row.style.backgroundColor = 'orangered';
    }
    if (i % 3 == 0) {
      row.style.backgroundColor = 'lightblue';
    }
  });
});
 */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/**
 * lecture - 4, primitive data type bigInt
 console.log(2 ** 53 - 1);
console.log(BigInt(200020));

//operations with bigInt
console.log(100000n + 100000n);
console.log(6789199191922222222n * 1000000100000000n);
const huge = 18993400227273663882n;
const num = 23;
console.log(huge * BigInt(num));

//exceptions
console.log(typeof 20n, 20n === 20, 20n == 20);
//math operation also does not work on bigInts

//string contcatination
console.log(huge + ' is really big number');

//divisions
console.log(10n / 3n, 10 / 3);
 */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/**
 *
 * lecture -5 , creating dates
//create a date - > there are four ways of doing it
const now = new Date(); //gives the current time date 
console.log(now);

const dateString = new Date('Jul 13 2022 21:02:04');
console.log(dateString);
console.log(new Date('December 24,2024'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2002, 8, 27, 10, 48, 23, 1));
console.log(new Date(2002, 8, 39, 10, 48, 23, 1));

console.log(new Date(0));
console.log(new Date(100000 * 24 * 60 * 60 * 1000));


//working with dates
const future = new Date(2037, 8, 27, 10, 48, 23, 1);
console.log(future.getFullYear());
console.log(future.getYear()); //simply returns the number of years passed after 1970, the universal first day of JS
console.log(future.getMonth()); //zero based indexing
console.log(future.getDate()); //day of the month
console.log(future.getDay()); // day of the week
console.log(future.getHours());
console.log(future.getSeconds());
console.log(future.getMinutes());
console.log(future.getMilliseconds());

//the standard string methods of the date
console.log(future.toISOString());
console.log(future.toDateString());
console.log(future.toLocaleDateString());
console.log(future.toLocaleString());
console.log(future.toString());
console.log(future.toLocaleTimeString());
console.log(future.toTimeString());
console.log(future.toUTCString());
console.log(future.toJSON());

//timestamp for the date
console.log(future.getTime());
console.log(Date.now()); //gives the current time stamps

//set versions for a date
future.setFullYear(2040);
console.log(future);
 */

/**
 *
 * lecture - 6 , operations with the dates
 const future = new Date(2037, 8, 27, 10, 48, 23, 1);
 console.log(calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14)));
 */

/**
 *
 * lecture -7 , operations on numbers using intl api
 const num = 38888884789.9;
const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'INR',
  // useGrouping: false,
};
console.log(
  new Intl.NumberFormat('en-US', options).format(num),
  ` -> this is for US 🇺🇸`
);
console.log(
  new Intl.NumberFormat('en-IN', options).format(num),
  ` -> this is for Inida 🇮🇳`
);
console.log(
  new Intl.NumberFormat('ar-SY', options).format(num),
  ` -> this is for Syrian 🇸🇾`
);
 */

/**lecture - 8 all about timers
 * 
 * setTimeOut
 const ingredients = ['olives', 'tattai'];
const timer = setTimeout(
  function (ing1, ing2) {
    console.log(`here is your pizza 🍕 with ${ing1} and ${ing2}`);
  },
  3000,
  ...ingredients
);
// the callback function is called after the time given
console.log('waiting for the pizza');

if (ingredients.includes('spinach')) clearTimeout(timer); //clearing the timer in the background


//setInterval
const everySeconds = setInterval(function () {
  const now = new Date();
  let str = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`;
  console.log(str);
}, 1000);

clearInterval(everySeconds); //clearing the intervaltimer in the background
 */
