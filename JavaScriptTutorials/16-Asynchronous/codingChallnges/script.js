"use strict";
// https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=374316450623405907072x86976

// Coding Challenge #1
// 374316450623405907072x86976
// 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=374316450623405907072x86976'
/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/
//////-------------------------------------------------------------------------------------------------------------------------------//////

const countriesContainer = document.querySelector(".countries");

// const getJSON = function (url, errorMessage = "Something went wrong") {
//   return fetch(url).then(function (response) {
//     if (!response.ok) {
//       throw new Error(` ${errorMessage} , ${response.statusText} `);
//     }
//     return response.json();
//   });
// };

// const renderCountry = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`).then((res) => {
//     const data = res[0];
//     console.log(data);
//     let currencies = [];
//     let languages = [];
//     for (const currencyKey of Object.keys(data.currencies)) {
//       currencies.push(currencyKey);
//     }
//     for (const languageKey of Object.keys(data.languages)) {
//       languages.push(languageKey);
//     }
//     //   console.log(currencies);
//     //   console.log(languages);

//     //////********************************//////
//     let html = `<article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[`${languages[0]}`]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[`${currencies[0]}`].name
//             }</p>
//           </div>
//         </article>`;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//   });

//   //////********************************//////
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText("beforeend", msg);
// };

// const whereAmI = function (latitude, longitude) {
//   return fetch(
//     `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=374316450623405907072x86976`
//   )
//     .then(function (response) {
//       if (!response.ok) {
//         throw new Error("Some Error occurred!");
//       }
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(`You are in ${data.region}`);
//       return data.country;
//     })
//     .catch((err) => console.error(err.message));
// };

// whereAmI("26.872611", "75.759074").then((data) => {
//   renderCountry(data);
// });

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.
PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;
    img.addEventListener("load", function () {
      countriesContainer.append(img);
      resolve(img);
    });
    img.addEventListener("error", function () {
      reject("Cannot open image , Something went wrong");
    });
  });
};
// let currentImage;
// createImage("./img/img-1.jpg")
//   .then(function (data) {
//     currentImage = data;
//     return wait(2);
//   })
//   .then(function () {
//     currentImage.style.display = "none";
//     return createImage("./img/img-2.jpg");
//   })
//   .then(function (data) {
//     currentImage = data;
//     return wait(2);
//   })
//   .then(function () {
//     currentImage.style.display = "none";
//     createImage("./img/img-3.jpg");
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

const loadNPause = async function (imgPath) {
  try {
    const img = await createImage(imgPath);
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

loadNPause("./img/img-1.jpg");
loadNPause("./img/img-2.jpg");
loadNPause("./img/img-3.jpg");
