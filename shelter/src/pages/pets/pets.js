import htmlToElement from '../../utils/htmlToElement';
import Header from '../../components/header';
import footer from '../../components/footer';
import { Card } from '../../utils/Card';
import { CardModal } from '../../utils/CardModal';
import PetsHtml from './pets.html';
import pets from '../../pets.json';
import _ from 'lodash';
import './pets.scss';

const headerBlock = document.querySelector('.pets__header');
headerBlock.appendChild(Header({page: document.location.pathname}));
const petsPage = htmlToElement(PetsHtml);
const slider = document.querySelector('.slides');
document.body.appendChild(footer);

const create8CardsInRandomOrder = () => {
    let cards = [];
    let shufle = _.shuffle(pets);
    shufle.forEach(card => {
        cards.push(new Card('petsAnimation', card))
    });
    return cards;
}

const fullList = [];
while(fullList.length !== 48) {
    create8CardsInRandomOrder().forEach(card => fullList.push(card));
}

const rebuildFullList  = (list) => {
    for (let index = 0; index < 8; index++) {
        const arr6card = list.slice(index * 6, (index * 6) + 6);
        for (let j = 0; j < 6; j++) {
            const repeatingCard = arr6card.find((item, idx) => {
                return item.name === arr6card[j].name && (idx !== j);
            });
            if (repeatingCard) {
                const idx = (index * 6) + j;
                const whichArr = Math.trunc(idx / 8);
                const card = list.splice(idx, 1)[0];
                list.splice(whichArr * 8, 0, card);
                index -= 2;
                break;
            }
        }
        
    }
    return list;
}
rebuildFullList(fullList).forEach(card => slider.append(card.generateCard()));

const slidesPerPage = () => {
    return (window.innerWidth > 1279) ? 8 : (window.innerWidth < 1280 && window.innerWidth > 767) ? 6 : (window.innerWidth < 768) ? 3 : false;
}

const moveSlide = (num) => {
    if (num === 8) return 930;
    if (num === 6) return 1395;
    if (num === 3) return 1395;
}

const lastSlide = (num) => {
    if (num === 8) return 930 * 5;
    if (num === 6) return 1395 * 7;
    if (num === 3) return 1395 * 15;
}

const btnLeftLast = document.querySelector('.button__left-last');
const btnLeft = document.querySelector('.button__left');
let btnCount = document.querySelector('.button__count');
const btnRight = document.querySelector('.button__right');
const btnRightLast = document.querySelector('.button__right-last');
const slide = document.querySelectorAll('.card');
let currentPos = 0;
btnLeft.disabled = true;
btnLeftLast.disabled = true;
btnCount.innerHTML = 1;

function setPosition(position){
    if (position >= 0){
        btnLeft.disabled = true;
        btnLeftLast.disabled = true;
    } else {
        btnLeft.disabled = false;
        btnLeftLast.disabled = false;
    }
    if (position<=-(lastSlide(slidesPerPage()))){
        btnRight.disabled = true;
        btnRightLast.disabled = true;
    } else {
        btnRight.disabled = false;
        btnRightLast.disabled = false;
    }
    currentPos = position;
    slide.forEach(slide => slide.style.transform = `translateY(${position}px)`);
    return currentPos;
}

btnRight.onclick = () => {
    setPosition(currentPos - moveSlide(slidesPerPage()));
    +btnCount.textContent++ ;
}

btnLeft.onclick = () => {
    setPosition(currentPos + moveSlide(slidesPerPage()));
    +btnCount.innerHTML--;
}

btnLeftLast.onclick = () => {
    setPosition(0);
    btnCount.textContent = 1;
};

window.onresize = () => {
    setPosition(0);
    btnCount.textContent = 1;
}

btnRightLast.onclick = () => {
    setPosition(-lastSlide(slidesPerPage()));
    btnCount.textContent = 48 / slidesPerPage();
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

export default petsPage;
