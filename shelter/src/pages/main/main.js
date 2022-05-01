import Header from '../../components/header';
import footer from '../../components/footer';
import { Card } from '../../utils/Card';
import pets from '../../pets.json';
import './main.scss';

import { CardModal } from '../../utils/CardModal';
const headerBlock = document.querySelector('.main__header');
headerBlock.appendChild(Header({page: document.location.pathname}));
document.body.appendChild(footer);
const btnRight = document.querySelector('.button__right');
const btnLeft = document.querySelector('.button__left');
const slider = document.querySelector('.slides');

const slidesPerPage = () => {
    if(window.innerWidth>1279) return 3;
    if(window.innerWidth<=1279 && window.innerWidth>767) return 2;
    if(window.innerWidth<768) return 1;
}

let prevValues = [];

const createCards = (className, count) => {
    let cards = [];
    let randomNum = getRandomNumber();
    for (let i = 0; i < count; i++){
        while (prevValues.includes(randomNum)) randomNum = getRandomNumber();
        prevValues.push(randomNum);
        cards.push(new Card(className, pets[randomNum]))
    }
    return cards;
}

const getRandomNumber = () => {
    return Math.floor(Math.random() * pets.length);
}

createCards('initial', slidesPerPage()).forEach(card => {
    slider.append(card.generateCard());
})
let timeout = false;
let delta = 200;
var rtime;

const resizeend = () => {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        clean();
        createCards('initial', slidesPerPage()).forEach(card => {
            slider.append(card.generateCard());
        })
    }
}

window.onresize = () => {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
}

const clean = () => { 
    if (prevValues.length >= slidesPerPage() * 2) {
        while (prevValues.length !== slidesPerPage()) prevValues.shift();
    }
    [...slider.children].forEach(ch => slider.removeChild(ch));
}

btnRight.onclick = () => {
    clean();
    createCards('from-right', slidesPerPage()).forEach(card => {
        slider.append(card.generateCard());
    });
}

btnLeft.onclick = () => {
    clean();
    createCards('from-left', slidesPerPage()).forEach(card => {
        slider.append(card.generateCard());
    });
}

const addSlidesClickHandler = () => {
    slider.addEventListener('click', (e) => {
        if (e.target.closest('.card')){
            let clickCardDataName = e.target.closest('.card').getAttribute('data-name');
            let clickCardData = getClickData(clickCardDataName);
            renderCardModalWindow(clickCardData);
        }
    })
}

const getClickData = (name) => {
    return pets.find(pet => pet.name === name);
}

const renderCardModalWindow = (pet) => {
    let modal = new CardModal('modal', pet);
    modal.renderModal();
}

addSlidesClickHandler();