import './styles/index.css';
import {initialCards} from "./scripts/cards";
import {createCard, deleteCard} from "./scripts/card";

const cardContainer = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
    const name = element.name;
    const link = element.link;
    const card = createCard(deleteCard, name, link);
    cardContainer.append(card);
});