import './styles/index.css';
import {initialCards} from "./scripts/cards";
import {createCard, deleteCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";

const cardContainer = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Buttons to open Popups
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

// Edit Profile Popup
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditName = popupEdit.querySelector('.popup__input_type_name');
const popupEditDescription = document.querySelector('.popup__input_type_description');
const popupEditForm = document.forms['edit-profile'];

// New Card Popup
const popupNewCard = document.querySelector('.popup_type_new-card');

// Image Popup
const popupImage = document.querySelector('.popup_type_image');

// List of All Popups
const popupList = document.querySelectorAll('.popup');

// 1.0 Display Initial Cards

// @todo: Display Initial Cards
initialCards.forEach((element) => {
    const name = element.name;
    const link = element.link;
    const card = createCard(deleteCard, name, link);
    cardContainer.append(card);
});

// 2.0 Open & Close Modals

// @todo: Open Popup when edit is clicked
profileEditBtn.addEventListener('click', () => {
    handlerOpenModalPopupEditWithInput(popupEdit);
});

// @todo: Edit Popup Form Submit
popupEdit.addEventListener('submit', handlerEditProfileFormSubmit);

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


// 3.0 Handlers

// @todo: Handler to Open Modal popupEdit
const handlerOpenModalPopupEditWithInput = (popupEdit) => {
    popupEditName.value = profileTitle.textContent;
    popupEditDescription.value = profileDescription.textContent;
    openModal(popupEdit);
};

// @todo: Handler to Submit Edit Popup Form
function handlerEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupEditName.value;
    profileDescription.textContent = popupEditDescription.value;
    closeModal(popupEdit);
}