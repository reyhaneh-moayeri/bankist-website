'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn, i) => {
  btn.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelectorAll('.section'));

console.log(document.getElementsByTagName('button'));

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookied for improved functionality and analystic <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';

//smooth scrolling
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScroll.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();

  // console.log(btnScroll.getBoundingClientRect());
  // console.log(document.documentElement.clientHeight, window.pageYOffset);
  // window.scrollTo({
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // another way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// const randomNum = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min)

// }

// const randomColor = () => {
//   return `rgb(${randomNum(0,255)}, ${randomNum(0,255)}, ${randomNum(0,255)})`
// }

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()
//   console.log("nav-link",e.target , e.currentTarget);
//   // e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("nav-links",e.target, e.currentTarget);

// })

// ************** smooth scrollimg to the sections *****************
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click' , function (e) {
//     e.preventDefault()

//     const id = this.getAttribute("href")
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior : "smooth"})

//   })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const h1 = document.querySelector('h1');

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el){
//   if (el !== h1) el.style.transform = 'scale(.5)'
// })

// h1.closest('.header').style.backgroundColor="orangered"

const tabContainer = document.querySelector('.operations__tab-container');
const content = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');
// console.log(content);
// [...tabContainer.children].forEach(function (el) {
//   el.addEventListener('click', (e) => {
//     for (const i of [...tabContainer.children]) {
//       i.classList.remove('operations__tab--active')
//     }
//     el.classList.add('operations__tab--active')
//     const id = el.getAttribute('data-tab')
//     // console.log(id);

//     for (const slide of content) {
//       slide.classList.remove('operations__content--active')
//     }

//     content[id-1].classList.add('operations__content--active')

//   })
// })
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  const id = clicked.getAttribute('data-tab');
  console.log(id);
  if (!clicked) return;
  tabs.forEach(el => {
    el.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  content.forEach(el => {
    el.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = `${opacity}`;
    });
    logo.style.opacity = `${opacity}`;
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// sticky menu
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   // console.log(window.scrollY);
//   // console.log(initialCoords);
//   if (window.pageYOffset > initialCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  entries.forEach(entry => {
    console.log(entry);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};

const sectionObserv = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserv.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading

const imgTargets = document.querySelectorAll('img[data-src]');

console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(image => {
  imgObserver.observe(image);
});

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let currentSlide = 0;
const maxSlide = slides.length;
// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';

const createDots = () => {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide=${i}></button>`
    );
  });
};
createDots();
const goToSlide = slide => {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};

const activateDot = slide => {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');

    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  });
};
activateDot(0);
goToSlide(0);

const nextSlide = () => {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else currentSlide--;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  }

  if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
