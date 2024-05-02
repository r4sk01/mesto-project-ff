import './styles/index.css';
import {initialCards} from "./scripts/cards";
import {createCard, deleteCard, likeCard} from "./scripts/card";
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

// New Card Popup
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardName = document.querySelector('input[name="place-name"]');
const popupNewCardUrl = document.querySelector('input[name="link"]');
const popupNewCardForm = document.forms['new-place'];

// Image Popup
const popupImage = document.querySelector('.popup_type_image');
const popupImageFull = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// List of All Popups
const popupList = document.querySelectorAll('.popup');

// 1.0 Display Initial Cards

// @todo: Display Initial Cards
initialCards.forEach((element) => {
    const name = element.name;
    const link = element.link;
    const card = createCard(deleteCard, likeCard, handlerOpenFullImage, name, link);
    cardContainer.append(card);
});

// 2.0 Open & Close Modals

// @todo: Open Popup when edit is clicked
profileEditBtn.addEventListener('click', () => {
    handlerOpenModalPopupEditWithInput(popupEdit);
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

// 3.0 Submits

// @todo: Edit Popup Form Submit
popupEdit.addEventListener('submit', handlerEditProfileFormSubmit);

// @todo: New Card Popup: Add Submit
popupNewCard.addEventListener('submit', handlerNewCardSubmit);

// 4.0 Handlers

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

// @todo: Handler to Add New Card Via Form Submit
function handlerNewCardSubmit(evt) {
    evt.preventDefault();
    const name = popupNewCardName.value;
    const link = popupNewCardUrl.value;
    cardContainer.prepend(createCard(deleteCard, likeCard, handlerOpenFullImage, name, link));
    popupNewCardForm.reset();
    closeModal(popupNewCard);
}

// @todo: Handler to Open an Image on Click
function handlerOpenFullImage(link, name) {
    popupImageFull.src = link;
    popupImageFull.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupImage);
}