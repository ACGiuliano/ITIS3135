'use strict';

const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        const prevImg = document.querySelector('.preview-container img.preview');

        prevImg.src = e.target.src;
        prevImg.alt = e.target.alt;

        const figCap = document.querySelector('.preview-container figcaption');

        figCap.textContent = e.target.alt;
    }
});
    




