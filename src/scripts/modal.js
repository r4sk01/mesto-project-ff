export const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEscape);
    popup.addEventListener('click', closeModalByClick);
};

export const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEscape);
    popup.removeEventListener('click', closeModalByClick);
};

const closeModalByEscape = (evt) => {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

const closeModalByClick = (evt) => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
};