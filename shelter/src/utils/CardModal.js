import pets1 from '../assets/img/pets-charly.png';
import pets2 from '../assets/img/pets-freddie.png';
import pets3 from '../assets/img/pets-jennifer.png';
import pets4 from '../assets/img/pets-katrine.png';
import pets5 from '../assets/img/pets-scarlet.png';
import pets6 from '../assets/img/pets-sophia.png';
import pets7 from '../assets/img/pets-timmy.png';
import pets8 from '../assets/img/pets-woody.png';

import { Modal } from './Modal';

const petsImg = [
    pets1, pets2, pets3, 
    pets4, pets5, pets6,
    pets7, pets8
];
export class CardModal extends Modal {
    constructor(classes, {name, img, type, breed, description, age, inoculations, diseases, parasites}){
        super(classes);
        this.name = name;
        this.img = img;
        this.type = type;        
        this.breed = breed;    
        this.description = description;    
        this.age = age;    
        this.inoculations = inoculations;    
        this.diseases = diseases;    
        this.parasites = parasites;     
    }

    generateContent() {
        let template = '';
        this.img && 
        (template += `<img src="${petsImg.find(url => url.includes(this.name.toLowerCase()))}" alt="${this.breed}">`);
        template += `<div class="modal-text__content">`;
        this.name &&
        (template += `<h3 class="section-title modal-title">${this.name}</h3>`);
        this.type && this.breed &&
        (template += `<h4 class="modal__subtitle">${this.type} - ${this.breed}</h4>`);
        this.description &&
        (template += `<p class="modal-description">${this.description}</p>`);
        template += `<ul class="modal-list__wrapper">`;
        this.age && 
        (template += `<li><span class="bold">Age:</span> ${this.age}`);
        this.inoculations && 
        (template += `<li><span class="bold">Inoculations:</span> ${this.inoculations.join(', ')}`);
        this.diseases && 
        (template += `<li><span class="bold">Diseases:</span> ${this.diseases.join(', ')}`);
        this.parasites && 
        (template += `<li><span class="bold">Parasites:</span> <span>${this.parasites.join(', ')}</span>`);
        template += `</ul>`;
        template += `</div>`;
        return template;
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content)
    }
}