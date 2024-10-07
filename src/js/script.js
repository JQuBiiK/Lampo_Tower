'use strict';

const tabs = document.querySelectorAll('.tabs-btn-wrapper'),
      tabcontentplan = document.querySelector('.tabs-content-wrapper__img'),
      div = document.querySelector('.loop-block'),
      inner = document.querySelector('.inner'),
      onFloorDiv = document.querySelector('.tabs-content-wrapper__onfloor'),
      loopBlockTablet = document.querySelector('.loop-block-tablet'),
      tabcontentonfloor = document.querySelector('.tabs-content-wrapper__onfloor');

toggleActive(0);
changeContent();

tabs.forEach((item, index) => {
    item.addEventListener('click', () => {
        toggleActive(index);
        changeContent();
    });
});

function toggleActive(index) {
    tabs.forEach(item => item.classList.remove('active'));
    tabs[index].classList.add('active');
}

function changeContent() {
    if (tabs[0].classList.contains('active')) {
        tabcontentplan.classList.add('show');
        tabcontentonfloor.classList.remove('show');
        div.style.display = 'none';
    } else {
        tabcontentonfloor.classList.add('show');
        tabcontentplan.classList.remove('show');
        div.style.display = '';
        loopBlockTablet.classList.add('active');
    }
}

const loopBtn = document.querySelector('#slider'),
      transformBtn = document.querySelector('#transform'),
      transformBtnTablet = document.querySelector('#transform1'),
      transformBlock = document.querySelector('.transform-block'),
      transformBlockTablet = document.querySelector('.loop-block-tablet.transform-block'),
      loopBtnTablet = document.querySelector('#slider1'),
      loopImg = document.querySelector('.tabs-onfloor-img');

loopBtn.addEventListener('input', (e) => {
    let loogCof = loopBtn.value;
    loopImg.style.width = `${loogCof}%`;
    handleInputChange(e, loopBtn);
    if (loopBtn.value > 400) {
        transformBlock.classList.add('visual'); 
    } else {
        transformBlock.classList.remove('visual'); 
    }
});

transformBtn.addEventListener('input', (e) => {
    let loogCof = transformBtn.value;
    loopImg.style.transform = `translateX(-${loogCof * 0.8}%)`;
    console.log(1);
});

transformBtnTablet.addEventListener('input', (e) => {
    let loogCof = transformBtnTablet.value;
    loopImg.style.transform = `translateX(-${loogCof * 0.8}%)`;
    console.log(1);
});

loopBtnTablet.addEventListener('input', (e) => {
    let loogCof = loopBtnTablet.value;
    loopImg.style.width = `${loogCof}%`;
    handleInputChange(e, loopBtnTablet);
    if (loopBtnTablet.value > 400) {
        transformBlockTablet.classList.add('active'); 
    } else {
        transformBlockTablet.classList.remove('active'); 
    }
});

function handleInputChange(e ,selector) {
    let target = e.target
    if (e.target.type !== 'range') {
      target = selector;
    } 
    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

const modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal__btn-close'),
      imgBtn = document.querySelector('.tabs-onfloor-img');

imgBtn.addEventListener('click', () => openModal());

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('active')) { 
        closeModal();
    }
});

function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

closeModal();

const imageModal = document.querySelector('.modal__img'),
      roller = document.querySelector('.roll');
let isDragging = false;
let startPosition = 0;
let currentPosition = 0;

imageModal.addEventListener("mousedown", function(e) {
    startPosition = e.clientX - currentPosition;
    isDragging = true;
});

document.addEventListener("mousemove", function(e) {
    if (isDragging) {
        currentPosition = e.clientX - startPosition;
        imageModal.style.transform = "translateX(" + currentPosition * 0.05 + "%)";
        roller.value = -currentPosition * 1.7;
    }
});

document.addEventListener("mouseup", function(e) {
    isDragging = false;
});

roller.addEventListener("input", (e) => {
    imageModal.style.transform = `translateX(-${roller.value * 0.03}%)`;
});

function check() {
    if (window.matchMedia("(max-width: 520px)").matches) {
        div.remove();
        onFloorDiv.append(div);
        document.addEventListener("mousemove", function(e) {
            if (isDragging) {
                currentPosition = e.clientX - startPosition;
                imageModal.style.transform = "translateX(" + currentPosition * 0.05 + "%)";
                roller.value = -currentPosition * 0.91;
            }
        });
        roller.addEventListener("input", (e) => {
            imageModal.style.transform = `translateX(-${roller.value * 0.055}%)`;
        });
    };
};

check();
  
window.addEventListener('resize', check);