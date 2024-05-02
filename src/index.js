import './styles/index.css';
import {initialCards} from "./scripts/cards";
import {createCard, deleteCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";

const cardContainer = document.querySelector('.places__list');

// Buttons to open Popups
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

// Edit Profile Popup
const popupEdit = document.querySelector('.popup_type_edit');

// New Card Popup
const popupNewCard = document.querySelector('.popup_type_new-card');

// Image Popup
const popupImage = document.querySelector('.popup_type_image');

// List of All Popups
const popupList = document.querySelectorAll('.popup');

// @todo: Display Cards
initialCards.forEach((element) => {
    const name = element.name;
    const link = element.link;
    const card = createCard(deleteCard, name, link);
    cardContainer.append(card);
});

// @todo: Open Popup when edit button is clicked
profileEditBtn.addEventListener('click', () => {
    openModal(popupEdit);
});

// @todo: Open Popup when + is clicked
profileAddBtn.addEventListener('click', () => {
    openModal(popupNewCard);
});

// @todo: Close Popup By Click Cross
popupList.forEach((item) => {
    item.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(item);
    });
});