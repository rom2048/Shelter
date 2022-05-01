import pets1 from '../assets/img/pets-charly.png';
import pets2 from '../assets/img/pets-freddie.png';
import pets3 from '../assets/img/pets-jennifer.png';
import pets4 from '../assets/img/pets-katrine.png';
import pets5 from '../assets/img/pets-scarlet.png';
import pets6 from '../assets/img/pets-sophia.png';
import pets7 from '../assets/img/pets-timmy.png';
import pets8 from '../assets/img/pets-woody.png';

const petsImg = [
    pets1, pets2, pets3, 
    pets4, pets5, pets6,
    pets7, pets8
]

export class Card {
    constructor(className,{name, img, type, breed, description, age, inoculations, diseases, parasites}){
        this.className = className;
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

    generateCard() {
        let template = '';
        let card = document.createElement('div');
        card.className = `pets__item card ${this.className}`;
        card.setAttribute('data-name', this.name);
        this.img && 
        (template += `<img src="${petsImg.find(url => url.includes(this.name.toLowerCase()))}" alt="${this.breed}">`)
        this.name &&
        (template += `<h4 class="card__title">${this.name}</h4>`);
        template += `<a class="card__link">Learn more</a>`;
        card.innerHTML = template;
        return card;
    }
}