// @todo: Card Template
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Create Card
export const createCard = function (deleteCard, likeCard, handlerOpenFullImage, ...data) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardRemoveBtn = cardElement.querySelector('.card__delete-button')

    // Get Card Attributes from Spread
    const [name, link] = data;

    // Set Card Name
    cardElement.querySelector('.card__title').textContent = name;

    // Set Card Image
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.src = link;
    cardElementImage.alt = `Картинка отображающая ${name}`;

    // Event Listener for Delete Button, Like Button, Show Image
    cardRemoveBtn.addEventListener('click', (evt)=>{
        deleteCard(evt.target.closest('.places__item'));
    });

    cardLikeBtn.addEventListener('click', (evt)=>{
        likeCard(cardLikeBtn);
    });

    cardElementImage.addEventListener('click', (evt)=>{
        handlerOpenFullImage(link, name);
    });

    return cardElement;
};

// @todo: Delete Card
export const deleteCard = function (element){
    element.remove();
};

// @todo: Like Card
export const likeCard = function (element){
    element.classList.toggle('card__like-button_is-active');
};