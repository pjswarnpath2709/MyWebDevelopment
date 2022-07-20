'use strict';

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnOpenModal =>
  btnOpenModal.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////-------------------------------------------------------------------------------------------------------------------------------//////

// SCROLLING FUNCTIONALITY TO THE SITE

btnScrollTo.addEventListener('click', function (e) {
  const s1Cords = section1.getBoundingClientRect(); //returns the coordinates of the selected element
  console.log(s1Cords);

  //important thing to know

  //////+++++++++++++++++++++++++++++++++++++++++//////

  // console.log(e.target.getBoundingClientRect());

  //////+++++++++++++++++++++++++++++++++++++++++//////

  // console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  // console.log(
  //   'height/width  viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //////+++++++++++++++++++++++++++++++++++++++++//////

  // old school way
  // window.scrollTo(
  //   s1Cords.left + window.pageXOffset,
  //   s1Cords.top + window.pageYOffset
  // );
  // old school way
  // window.scrollTo({
  //   left: s1Cords.left + window.pageXOffset,
  //   top: s1Cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //////+++++++++++++++++++++++++++++++++++++++++//////

  //this only works in modern javascript
  section1.scrollIntoView({ behavior: 'smooth' });

  //////+++++++++++++++++++++++++++++++++++++++++//////
});

//////-------------------------------------------------------------------------------------------------------------------------------//////

// PAGE NAVIGATION i.e. SCROLLING

//this is fine but not efficient

/*
document.querySelectorAll('.nav__link').forEach(ele => {
  ele.addEventListener('click', function (event) {
    event.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}); 
*/

//////-------------------------------------------------------------------------------------------------------------------------------//////

// 1. Add event listener to the common parrent element
// 2. in that listerner , determine which element originated that event

document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    // console.log(event.target);

    // matching strategy
    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

//////-------------------------------------------------------------------------------------------------------------------------------//////

// TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const clicked = event.target.closest('.operations__tab');
  //Gaurd cluase
  if (!clicked) {
    return;
  }

  //remove active classes from the all
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  //Active tab
  clicked?.classList.add('operations__tab--active');

  //Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////-------------------------------------------------------------------------------------------------------------------------------//////
//MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this, e.currentTarget);
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // link.style.opacity = 1;
    siblings.forEach(el => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//revising the bind function
//Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//////-------------------------------------------------------------------------------------------------------------------------------//////

// STICKY NAVIGATION
// const initalCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   // console.log(this.window.scrollY);
//   if (this.window.scrollY > initalCords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//STICKY NAVIGATION : INTERSECTION OBSERVER API
/*
const observerCallBack = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const observerOptions = {
  root: null, // this is the element that the taregt is intersecting, null -> viewport
  threshold: [0, 0.2], // this is the percentage of intersection where the callback will called
  const observer = new IntersectionObserver(observerCallBack, observerOptions);
observer.observe(section1);
};
*/
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');
const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObs.observe(header);

//////-------------------------------------------------------------------------------------------------------------------------------//////

//REVEAL SECTIONS

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  rootMargin: '0px',
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////-------------------------------------------------------------------------------------------------------------------------------//////
//LAZY IMAGE LOADING
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  const oldSrc = entry.target.src;

  if (!entry.isIntersecting) {
    return;
  }
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.15,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

//////-------------------------------------------------------------------------------------------------------------------------------//////
// Slider
const sliderInitiate = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currentSlide = 0;

  //////+++++++++++++++++++++++++++++++++++++++++//////
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activeDot = function (slideNumber) {
    dotContainer.childNodes.forEach((el, i) => {
      if (i === slideNumber) {
        el.classList.add('dots__dot--active');
      } else {
        el.classList.remove('dots__dot--active');
      }
    });
  };
  const gotoSlide = function (slideNumber) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - slideNumber) * 100}%)`;
    });
  };
  //////+++++++++++++++++++++++++++++++++++++++++//////
  createDots();
  gotoSlide(0);
  activeDot(0);
  //////+++++++++++++++++++++++++++++++++++++++++//////
  //NEXT SLIDE

  const nextSlide = function () {
    currentSlide = (currentSlide + 1) % slides.length;
    gotoSlide(currentSlide);
    activeDot(currentSlide);
  };
  //////+++++++++++++++++++++++++++++++++++++++++//////
  //PREVIOUS SLIDE
  const previousSlide = function () {
    if (currentSlide == 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
    activeDot(currentSlide);
  };
  //////+++++++++++++++++++++++++++++++++++++++++//////
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      currentSlide = Number.parseInt(e.target.dataset.slide);
      gotoSlide(currentSlide);
      activeDot(currentSlide);
    }
  });
};

sliderInitiate();
//////-------------------------------------------------------------------------------------------------------------------------------//////

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

/**lecture -1  , all about inserting and deleting elements from the DOM
 * 
 //selecting the elements

console.log(document.documentElement); //selections the whole page
console.log(document.head);
console.log(document.body);

console.log();
const header = document.querySelector('.header');
const alllSections = document.querySelectorAll('.section');
console.log(alllSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //this returns a html collection and updates itself if the collection changes
console.log(document.getElementsByClassName('btn')); //this also returns a html collection

//creating and inseting elements in the DOM

// one way of doing this is .inserAdjacentHTML
const message = document.createElement('div');
console.log(message);
message.classList.add('cookie-message');
// message.textContent = 'hello this is a new dom element';
message.innerHTML =
  'hello this is a new dom element <button class ="btn btn--close-cookie">Got it!</button>';

header.prepend(message); //add the element as the first child of the selected element
//an element can be present in the DOM only once so the prepend is cancled and append will work
header.append(message); //added the element as the last child of the selected element

// header.append(message.cloneNode(true));  //cloning the elements

header.before(message); //add the element before the selected element as sibling
header.after(message); //add the element after the selected element as sibling

//deleting the elements from the DOM
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();

    message.parentElement.removeChild(message); //removing using the parent approach --> DOM traversing
  });

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

/*
// lecture 2  all about styles , attributes and classes
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'hello this is a new dom element <button class ="btn btn--close-cookie">Got it!</button>';
header.after(message);

//styles
message.style.backgroundColor = '#37383d';
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered'); //changing the custom properties in CSS , aka CSS variables

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //it is the absolute url
console.log(logo.className);
// console.log(logo.classList);

//setting the attributes
logo.alt = 'beautiful minimalist logo';

//non standard attributes
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute(`src`)); //it is the relative url

//links - special case
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// data attributes - special types of attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

/*
lecture-4 , types of events and event handellers 

const h1 = document.querySelector('h1');
const alretH1 = function () {
  alert('addEventListener :  great you are reading a heading');

  //////-------------------------------------//////

  // h1.removeEventListener('mouseenter', alretH1);
};

// mouse enter event is a hover event
h1.addEventListener('mouseenter', alretH1);

//////-------------------------------------//////

//old scool way
// h1.onmouseenter = function () {
//   alert('addEventListener :  great you are reading a heading');
// };

//////-------------------------------------//////

//removing event handller
setTimeout(() => h1.removeEventListener('mouseenter', alretH1), 3000);

//////-------------------------------------//////
*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

/**lecture - 6 , event propagation : bubbling and capturing phase 
 * 
 * 
 const randomInt = (min, max) =>
  Math.floor(Math.random() * Math.abs(min - max + 1) + Math.min(min, max));

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// addEventListeners only read events in the bubbling not in the capturing phase
document
  .querySelector('.nav__link')
  .addEventListener('click', function (event) {
    this.style.backgroundColor = randomColor();
    console.log('link : ', event.target, event.currentTarget);

    //////-------------------------------------------------------------------------------------------------------------------------------//////
    // to stop event propagation
    // event.stopPropagation();
  });
// addEventListeners only read events in the bubbling not in the capturing phase
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    this.style.backgroundColor = randomColor();
    console.log('conatiner : ', event.target);
  });
// addEventListeners only read events in the bubbling not in the capturing phase
document.querySelector('.nav').addEventListener(
  'click',
  function (event) {
    this.style.backgroundColor = randomColor();
    console.log('nav : ', event.target, event.currentTarget);
  },
  true // use capture parameter , by this now the addevent listener will listen to the capturing phase not to the bubbling phase
);

*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

/* lecture -7 , traversing the DOM tree 


const h1 = document.querySelector('h1');

// going downwards  :  child
console.log(h1.querySelectorAll('.highlight')); //query selectors works on all the elements
console.log(h1.childNodes);
console.log(h1.children); //this gives HTMLcollections which is a live collection, this only returns element children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'gray';

//going upwards : parents
console.log(h1.parentNode); // this returns the parent node
console.log(h1.parentElement); // this returns the parent element

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //just opposite of the querySelectors, they find child it find parent

//sideways : siblings
console.log(h1.previousElementSibling); // this returns an element
console.log(h1.nextElementSibling); // this returns an element

console.log(h1.previousSibling); // this returns the nodes
console.log(h1.nextSibling); // this returns the nodes

//selecting all siblings
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});


*/

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

/*lecture -second-last, Life Cycle of the webpage

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('loadedDOMCONTENT :', e);
});

window.addEventListener('load', function (e) {
  console.log('load: ', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/

/*
lecture - last , Efficient Script Loading : Defer and Async


*/
