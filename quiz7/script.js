
'use strict';

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

const carouselNav = document.querySelector('.carousel-nav');

leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);
carouselNav.addEventListener('click', dotNav);


// handles event for clicking on arrows to swipe left and right
function swipe(e) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;

    if(e.currentTarget.classList.contains('left')) {
        if (currentIndex === 0) {
            nextIndex = CAROUSEL_SIZE - 1;
        }
        else {
            nextIndex = currentIndex - 1;
        }
    }
    else {
        if (currentIndex === CAROUSEL_SIZE - 1) {
            nextIndex = 0;
        }
        else {
            nextIndex = currentIndex + 1;
        }
    }

    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');    
}

// listener for clicking on dots
function dotNav(e) {
    if (e.target.classList.contains('nav-item')) {
        const clickedOn = navItems.indexOf(e.target);
        updateCarousel(clickedOn);
    }
}

function updateCarousel(e) {
    const currentItem = document.querySelector('.carousel-item.active');
    const currentNav = document.querySelector('.nav-item.active');

    if (currentItem) {
        currentItem.classList.remove('active');
    }
    if (currentNav) {
        currentNav.classList.remove('active');
    }

    carouselItems[e].classList.add('active');
    navItems[e].classList.add('active');
}


