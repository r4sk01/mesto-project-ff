// @todo: APIs Import
import {deleteCard, clickCardLike, deleteCardLike} from "./api.js";

// @todo: Card Template
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Delete Card Handler
export const handleDeleteCard = (cardId, cardElement) => {
    deleteCard(cardId)
        .then(() => {
            removeCard(cardElement);
        })
        .catch((error) => {
            console.log(error);
        });
};

// @todo: Like Click Handler
export const handleClickLike = (
    like,
    cardData,
    buttonIsActive,
    likeCounter
) => {
    const likeMethod = like.classList.contains(buttonIsActive)
        ? deleteCardLike
        : clickCardLike;
    likeMethod(cardData._id)
        .then((res) => {
            likeCounter.textContent = res.likes.length;
            like.classList.toggle(buttonIsActive);
        })
        .catch((error) => {
            console.log(error);
        });
};

// @todo: Like Counter
const countLike = (counter, cardData) => {
    if (cardData.length >= 1) {
        counter.classList.add(".card__like-counter_is-active");
        counter.textContent = cardData.length;
    } else {
        counter.classList.remove(".card__like-counter_is-active");
    }
};

// @todo: Create Card
export function createCard(cardData, userId, handleDeleteCard, handleClickLike, handleClickCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteBtn = cardElement.querySelector(".card__delete-button");
    const likeBtnContainer = cardElement.querySelector(".card__like-container");
    const likeBtn = cardElement.querySelector(".card__like-button");
    const likeBtnActive = "card__like-button_is-active";
    const likeCounter = likeBtnContainer.querySelector(".card__like-counter");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener("click", () => handleClickCard(cardData));

    likeBtn.addEventListener("click", () => {
        handleClickLike(likeBtn, cardData, likeBtnActive, likeCounter);
    });

    if (userId === cardData.owner._id) {
        deleteBtn.addEventListener("click", () => {
            handleDeleteCard(cardData._id, cardElement);
        });
    } else {
        deleteBtn.remove();
    }

    if (cardData.likes.some((likeElement) => likeElement._id === userId)) {
        likeBtn.classList.add(likeBtnActive);
    }

    countLike(likeCounter, cardData.likes);

    return cardElement;
}

// @todo: Remove Card
const removeCard = (cardElement) => {
    cardElement.remove();
};