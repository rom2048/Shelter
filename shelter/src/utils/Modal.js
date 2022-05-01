export class Modal {
    constructor(classes){
        this.classes = classes;
        this.modal = '';
        this.modalContent = '';
        this.modalCloseBtn = '';
        this.overlay = '';
    }

    buildModal(content){
        this.overlay = this.createDomNode(this.overlay, 'div', 'overlay', 'overlay_modal');
        this.modal = this.createDomNode(this.modal, 'div', this.classes);
        this.modalContent = this.createDomNode(this.modalContent, 'div', 'modal__content');
        this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'div', 'modal_btn');
        this.setContent(content);
        this.appendModalElements();
        this.bindEvents();
        this.openModal();
    }
    createDomNode(node, element, ...classes){
        node = document.createElement(element);
        node.classList.add(...classes);
        return node;
    }

    setContent(content){
        if (typeof content === 'string') {
            this.modalContent.innerHTML = content;            
        } else {
            this.modalContent.innerHTML = ``;
            this.modalContent.append(content);
        }
    }

    appendModalElements(){
        this.modal.append(this.modalCloseBtn);
        this.modal.append(this.modalContent);
        this.overlay.append(this.modal);
    }

    bindEvents(){
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal(){
        document.body.append(this.overlay);
        document.body.classList.add('_lock');
    }

    closeModal(e){
        let classes = e.target.classList;
        if ( classes.contains('overlay') || classes.contains('modal_btn')) {
            document.querySelector('.overlay').remove();
            document.body.classList.remove('_lock');
        }
    }
}