'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//////+++++++++++++++++++++++++++++++++++++++++//////

const renderCountry = function (data, className) {
  //////********************************//////

  let currencies = [];
  let languages = [];
  for (const currencyKey of Object.keys(data.currencies)) {
    currencies.push(currencyKey);
  }
  for (const languageKey of Object.keys(data.languages)) {
    languages.push(languageKey);
  }
  //   console.log(currencies);
  //   console.log(languages);

  //////********************************//////
  let html = `<article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[`${languages[0]}`]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[`${currencies[0]}`].name
        }</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
//////+++++++++++++++++++++++++++++++++++++++++//////

// //////+++++++++++++++++++++++++++++++++++++++++//////

// const getCountryAndNbrData = function (country) {
//   // create a request object
//   const request = new XMLHttpRequest(); // old school way
//   // open the request
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   // send the request
//   request.send();

//   // receive the data from the web server
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // get Nbr country
//     const nbrs = data.borders;
//     console.log(nbrs);

//     // request for the borders
//     const request2 = new XMLHttpRequest(); // old school way
//     // open the request
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${nbrs[0]}`);

//     // send the request
//     request2.send();

//     // receive the data from the web server
//     request2.addEventListener('load', function () {
//       const [data_nbr] = JSON.parse(this.responseText);
//       console.log(data_nbr);
//       renderCountry(data_nbr, 'neighbour');
//     });
//   });
// };

// //////+++++++++++++++++++++++++++++++++++++++++//////

// getCountryAndNbrData('republic of india');

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// Promises and FetchApi
const request = fetch('https://restcountries.com/v3.1/name/bharat');
console.log(request);

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw new Error(` ${errorMessage} , ${response.statusText} `);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       if (!response.ok) {
//         // agar response ok nahi hai , may be error 404 , 400 etc
//         // the error like 404 , 400 are not catch by the catch() function
//         // because they are just response only and hence are treated as Fulfilled Promise
//         throw new Error('Country not found');
//         // the throw keyword immediately stops the current function execution and returns a rejected Promise
//       }
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//       const nbr = data[0].borders[0];
//       console.log(data[0]);

//       if (!nbr) return;

//       console.log(nbr);

//       return fetch(`https://restcountries.com/v3.1/alpha/${nbr}`);
//     })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (nbr_data) {
//       renderCountry(nbr_data[0], 'neighbour');
//     })
//     .catch(function (err) {
//       console.error(`${err} 🤨🥲`);
//       renderError(err.message);
//       //alert(err);
//     })
//     .finally(function (_) {
//       countriesContainer.style.opacity = 1;
//       console.log(
//         'This will be called , no matter whatever happens to the promise '
//       );
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not Found')
    .then(function (data) {
      renderCountry(data[0]);
      const nbr = data[0].borders[0];
      console.log(data[0]);

      if (!nbr) throw new Error('No Neighbour found for the Country!');

      console.log(nbr);

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${nbr}`,
        'Country not found'
      );
    })
    .then(function (nbr_data) {
      renderCountry(nbr_data[0], 'neighbour');
    })
    .catch(function (err) {
      console.error(`${err} 🤨🥲`);
      renderError(err.message);
      //alert(err);
    })
    .finally(function (_) {
      countriesContainer.style.opacity = 1;
      console.log(
        'This will be called , no matter whatever happens to the promise '
      );
    });
};

btn.addEventListener('click', function () {
  getCountryData('india');
});

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//////+++++++++++++++++++++++++++++++++++++++++//////

// const lotteryPromise = new Promise(function (resolve, reject) {
//   // this executer function will produce the value that will be basically the future value of the promise
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.8) {
//       // means that the function is fulfilled
//       resolve('you won the lottery 🥳🤩');
//     } else {
//       // this will be treated as error
//       reject(new Error('You lost the lottery 🥲😫'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(err => console.log(err));

//////********************************//////

// Promisify
// const wait = function (seconds) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(4)
//   .then(function (_) {
//     console.log('hey i am a Promise that waited for about 4 seconds');
//     return wait(1);
//   })
//   .then(function (_) {
//     console.log('I waited for another 1 seconds ');
//   });

//////+++++++++++++++++++++++++++++++++++++++++//////

// Promisifying the Geolocation Api

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);
//   },
//   function (error) {
//     console.log(new Error(error));
//   }
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     console.log('Wait! , fetching your location...');
//     // navigator.geolocation.getCurrentPosition(
//     //   function (position) {
//     //     resolve(position);
//     //   },
//     //   function (error) {
//     //     reject(new Error('Cannot fetch your location 😕'));
//     //   }
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(function (data) {
//   console.log(data.coords.latitude, data.coords.longitude);
// });

//////+++++++++++++++++++++++++++++++++++++++++//////

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//////+++++++++++++++++++++++++++++++++++++++++//////

// Coding Challenge 2

// const imgContainer = document.querySelector('.images');
// const wait = function (seconds) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not Found!'));
//     });
//   });
// };
// let currentImg;
// createImage('img/img-1.jpg')
//   .then(function (data) {
//     currentImg = data;
//     console.log(data);
//     return wait(3);
//   })
//   .then(function () {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(function (data) {
//     currentImg = data;
//     console.log(data);
//     return wait(3);
//   })
//   .then(function () {
//     currentImg.style.display = 'none';
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//////+++++++++++++++++++++++++++++++++++++++++//////

// Consuming promises with Async/ Await
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     // Reverse geocoding
//     const resGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=3947149957586860255x111041`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();
//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);
//     // Reject promise returned from async function
//     throw err;
//   }
// };
// console.log(' 1: Will get the Location ');
// // whereAmI()
// //   .then(city => console.log(` 2: ${city} `))
// //   .catch(err => console.error(` 2 : ${err.message} 💥 `))
// //   .finally(() => console.log(' 3: Finished getting the data '));

// // using the IFE
// (async function () {
//   try {
//     let city = await whereAmI();
//     console.log(` 2: ${city} `);
//   } catch (err) {
//     console.error(` 2 : ${err.message} 💥 `);
//   }
//   console.log(' 3: Finished getting the data ');
// })();

//////+++++++++++++++++++++++++++++++++++++++++//////

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//////+++++++++++++++++++++++++++++++++++++++++//////

// Promise.all() -> run all the promises simultaneously
const get3Countries = async function (c1, c2, c3) {
  try {
    // let [data1] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c1}`,
    //   'Country not found!'
    // );
    // let [data2] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c2}`,
    //   'Country not found!'
    // );
    // let [data3] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c3}`,
    //   'Country not found!'
    // );

    // if one promise rejects then all the promises get reject
    const data = await Promise.all([
      getJSON(
        `https://restcountries.com/v3.1/name/${c1}`,
        'Country not found!'
      ),
      getJSON(
        `https://restcountries.com/v3.1/name/${c2}`,
        'Country not found!'
      ),
      getJSON(
        `https://restcountries.com/v3.1/name/${c3}`,
        'Country not found!'
      ),
    ]);

    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('India', 'Usa', 'China');

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

//////+++++++++++++++++++++++++++++++++++++++++//////

// Other Combinators of Promise -> race , allsettled , any
// Promise.race
(async function () {
  // the one which is loaded first is shown first
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/China`),
    getJSON(`https://restcountries.com/v3.1/name/America`),
    getJSON(`https://restcountries.com/v3.1/name/Italy`),
  ]);
  console.log(res[0].capital);
})();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, s);
  });
};

Promise.race([
  getJSON('https://restcountries.com/v3.1/name/China'),
  timeout(100),
])
  .then(data => console.log(data[0].capital))
  .catch(err => console.error(err));

// Promise.allsettled
// returns the array of all the settled promises
Promise.allSettled([
  getJSON('https://restcountries.com/v3.1/name/China'),
  getJSON('https://restcountries.com/v3.1/name/hfhfh'),
  getJSON('https://restcountries.com/v3.1/name/USA'),
]).then(data_s => {
  for (let data of data_s) {
    if (data.value) {
      console.log(data.value[0].capital[0]);
    }
  }
});

//Promise.any -> takes input as array of promises and returns first fulfilled promise
Promise.any([
  Promise.reject('First reject'),
  Promise.reject('Second reject'),
  Promise.resolve('Success'),
  Promise.reject('Third reject'),
  Promise.resolve('Another Success'),
]).then(data => console.log(data));
