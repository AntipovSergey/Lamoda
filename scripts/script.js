const headerCityButton = document.querySelector('.header__city-button');
let hash = location.hash.substring(1);
const goodsTitle = document.querySelector('.goods__title');
const navigationLink = document.querySelectorAll('.navigation__link');
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');


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
const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
};

//Запрос базы данных
const getData = async() => {
    const data = await fetch('db.json');

    if(data.ok) {
        return data.json();
    } else {
        throw new Error(`Данные не были получены. Ошибка ${data.status} ${data.statusText}`)
    };
};

const getGoods = (callback, value) => {
    getData()
        .then(data => {
            if(value) {
                callback(data.filter(item => item.category === value))
            } else {
                callback(data);
            };
        })
        .catch(err => {
            console.error(err);
        });
};

//Вызов функций
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

try {
    const goodsList = document.querySelector('.goods__list');
    
    if(!goodsList) {
        throw 'This is not a goods page';
    }

    const createCard = ({id, preview, cost, brand, name, sizes}) => {

        const li = document.createElement('li');
        li.classList.add('goods__item');

        li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/${name}</span></h3>
                    ${sizes ?
                        `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
                        ''}
                    <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                </div>
            </article>
        `;

        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';

        data.forEach(item => {
           const card = createCard(item);
           goodsList.append(card);
        });
    };

    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        getGoods(renderGoodsList, hash);
    });
    
    getGoods(renderGoodsList, hash);

} catch(err) {
    console.log(err);
};

//Смена категории пола
navigationLink[0].addEventListener('click', () => {
    goodsTitle.textContent = navigationLink[0].textContent;
})
navigationLink[1].addEventListener('click', () => {
    goodsTitle.textContent = navigationLink[1].textContent;
})
navigationLink[2].addEventListener('click', () => {
    goodsTitle.textContent = navigationLink[2].textContent;
})