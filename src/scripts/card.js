// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
export const createCard = function (deleteCard, ...data) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // Get Card Attributes from Spread
    const [name, link] = data;

    // Set Card Name
    cardElement.querySelector('.card__title').textContent = name;

    // Set Card Image
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.src = link;
    cardElementImage.alt = `Картинка отображающая ${name}`;

    // Event Listener for Delete Button
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt)=>{
        deleteCard(evt.target.closest('.places__item'));
    });

    return cardElement;
};

// @todo: Функция удаления карточки
export const deleteCard = function (element){
    element.remove();
};

// initialCards.forEach((element) => {
//     const name = element.name;
//     const link = element.link;
//     const card = createCard(deleteCard, name, link);
//     cardContainer.append(card);
// });