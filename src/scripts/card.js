// @todo: Card Template
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Create Card
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

// @todo: Delete Card
export const deleteCard = function (element){
    element.remove();
};