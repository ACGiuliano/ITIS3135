const root = document.documentElement;
'use strict';

const btns = document.querySelectorAll('button');

btns.forEach(btn => {
    btn.addEventListener('click', buttonClick);
});

// buttonClick definition
function buttonClick(e) {
    const btn = e.target;
    const content = btn.nextElementSibling;

    const isOpen = content.classList.contains('open');

    btns.forEach(otherBtn => {
        if (otherBtn !== btn) {
            otherBtn.classList.remove('open');
            otherBtn.nextElementSibling.classList.remove('open');
            otherBtn.nextElementSibling.style.height = '0px';
        }
    });

    if (!isOpen) {
        btn.classList.add('open');
        content.classList.add('open');
        content.style.height = content.scrollHeight + 'px';
    }
    else {
        btn.classList.remove('open');
        content.classList.remove('open');
        content.style.height = '0px';
    }
}

