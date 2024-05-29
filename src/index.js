import "./styles/index.css";
import {createCard, handleDeleteCard, handleClickLike } from "./scripts/card.js";
import {openModal, closeModal } from "./scripts/modal.js";
import {enableValidation, resetValidation } from "./scripts/validation.js";
import {getUser, getInitCards, updateAvatar, editProfile, postNewCard} from "./scripts/api.js";
import {validationConfig} from "./utils/constants";

const cardsContainer = document.querySelector(".places__list"); // список карточек

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const profileEditBtn = document.querySelector(".profile__edit-button"); // кнопка открытия попапа профиля

const popupCard = document.querySelector(".popup_type_new-card"); // попап добавления новой карточки
const profileAddBtn = document.querySelector(".profile__add-button"); // кнопка открытия попапа карточек

const formEditProfile = document.forms["edit-profile"];
const formCreateCard = document.forms["new-place"];
const formChangeAvatar = document.forms["new-avatar"];

const popupImage = document.querySelector(".popup_type_image"); // попап полнораземного изображения
const popupFullImage = popupImage.querySelector(".popup__image"); // изображение в полном размере
const popupCaption = popupImage.querySelector(".popup__caption"); // подпись под изображением

const avatarBtn = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");

const cardNameInput = popupCard.querySelector(".popup__input_type_card-name"); // название добавляемой карточки
const cardUrlInput = popupCard.querySelector(".popup__input_type_url"); // ссылка на добавляемую карточку

const nameInput = document.querySelector(".popup__input_type_name"); // вводимое имя в профиле
const descriptionInput = document.querySelector(".popup__input_type_description"); // вводимая работа в профиле

const profileTitle = document.querySelector(".profile__title"); // профиль - имя
const profileDescription = document.querySelector(".profile__description"); // профиль - работа

const avatarInput = document.querySelector(".popup__input_type_avatar");
const profileImage = document.querySelector(".profile__image-avatar");

// @todo: Avatar Change handler
const handleAvatarUpdate = (evt) => {
    evt.preventDefault();
    const avatarLink = avatarInput.value;
    evt.submitter.textContent = 'Сохранение...';
    updateAvatar(avatarLink)
        .then((avatar) => {
            profileImage.src = avatar.avatar;
            //closeModal(avatarInput);
            closeModal(popupAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
};

// @todo: Open Popup With Full Image
const openImagePopup = (cardData) => {
    popupFullImage.src = cardData.link;
    popupFullImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(popupImage);
};

// @todo: Add New Card Handler
const handleAddCardFormSubmit = (evt) => {
    evt.preventDefault();

    const name = cardNameInput.value;
    const link = cardUrlInput.value;

    evt.submitter.textContent = 'Сохранение...';

    postNewCard(name, link)
        .then((cardData) => {
            cardsContainer.prepend(
                createCard(
                    cardData,
                    cardData.owner._id,
                    handleDeleteCard,
                    handleClickLike,
                    openImagePopup
                )
            );
            closeModal(popupCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
};

// @todo: Edit Self Information
const handleEditProfileFormSubmit = (evt) => {
    evt.preventDefault();

    const name = nameInput.value;
    const job = descriptionInput.value;

    evt.submitter.textContent = 'Сохранение...';

    editProfile(name, job)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = descriptionInput.value;
            closeModal(popupProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
};

avatarBtn.addEventListener("click", () => {
    resetValidation(formChangeAvatar, validationConfig);
    openModal(popupAvatar);
});

// @todo: Fill Profile Input
const fillProfileInput = (popupProfile) => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(popupProfile);
};

// @todo: Listen to Open Profile Popup
profileEditBtn.addEventListener("click", () => {
    resetValidation(formEditProfile, validationConfig);
    fillProfileInput(popupProfile);
});

// @todo: Listen to Open Add Card Btn
profileAddBtn.addEventListener("click", () => {
    formCreateCard.reset();
    resetValidation(formCreateCard, validationConfig);
    openModal(popupCard);
});

// @todo: Turn On Validation
enableValidation(validationConfig);

// @todo: Display Cards
Promise.all([getUser(), getInitCards()])
    .then(([user, cards]) => {
        const userId = user._id;

        cards.forEach((cardData) => {
            const cards = createCard(
                cardData,
                userId,
                handleDeleteCard,
                handleClickLike,
                openImagePopup
            );
            cardsContainer.append(cards);
        });

        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;

        profileImage.src = user.avatar;
        profileImage.alt = user.name;
    })
    .catch((err) => {
        console.log(err);
    });

// @todo: Listeners for Modal Windows
formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
formCreateCard.addEventListener("submit", handleAddCardFormSubmit);
formChangeAvatar.addEventListener("submit", handleAvatarUpdate);

popupList.forEach(function (popupItem) {
    const popupCloseButton = popupItem.querySelector(".popup__close");
    popupCloseButton.addEventListener("click", () => {
        closeModal(popupItem);
    });
});