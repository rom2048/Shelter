import htmlToElement from '../../utils/htmlToElement';
import HeaderHtml from './header.html';
import './header.scss';

const Header = ({ page }) => {
    const nav =  htmlToElement(HeaderHtml);
    let menuLinks = nav.querySelectorAll('.header__menu-link');
    const iconMenu = nav.querySelector('.menu__icon');
    const menuBody = nav.querySelector('.menu__body');
    const menuLogo = nav.querySelector('.header__logo');

    const closeMenu = () => {
        if (document.body.classList.contains('_lock')){
            document.body.classList.toggle('_lock');
            document.querySelector('.overlay-menu').remove();
            iconMenu.classList.toggle('active');
            menuBody.classList.toggle('active');
            menuLogo.classList.toggle('active');
        }
    }

    const createOverlay = () => {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay-menu');
        overlay.addEventListener('click', (e) => {
            closeMenu();
        });
        return overlay;
    }

    if (page.includes('main')) {
        menuLinks[0].classList.add('active');
        menuLinks[0].onclick = (e) => {e.preventDefault(); closeMenu();}
        menuLinks[2].href = '#help';
        menuLinks[2].onclick = () => closeMenu();
        menuLinks[3].onclick = () => closeMenu();
    } else {
        menuLinks[1].classList.add('active');
        menuLinks[1].onclick = (e) => {e.preventDefault(); closeMenu();}
        menuLinks[2].href = 'main.html#help';
        menuLinks[3].onclick = () => closeMenu();
    }
    

    if (iconMenu) {
        iconMenu.addEventListener('click', () => {
            document.body.classList.toggle('_lock');
            if (document.body.classList.contains('_lock') &&
                window.innerWidth > 319){
                document.body.append(createOverlay());
            } else {
                document.querySelector('.overlay-menu').remove();
            }
            iconMenu.classList.toggle('active');
            menuBody.classList.toggle('active');
            menuLogo.classList.toggle('active');
        })
    }
    return nav;
}
export default Header;