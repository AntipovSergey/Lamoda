const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите Ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
});

//Блокировка скролла
const disableScroll = () => {
    const windowScroll = window.innerWidth - document.body.offsetWidth; //вычитаем ширину документа из ширины браузера и получаем значение ширины скролла
    
    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${windowScroll}px;
    `;
};

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY,
    });
};

//Открытие и закрытие модального окна
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
};

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', evt => {
    const target = evt.target;

    if(target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();
    };
});

document.addEventListener('keydown', (evt) => {
    if(evt.keyCode === 27) {
        cartModalClose();
    }
})

a