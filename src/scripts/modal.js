export const openModal = (popup) => {
    popup.classList.add("popup_is-opened");
    popup.addEventListener("click", handleCloseModalByClick);
    document.addEventListener("keydown", handleCloseModalByEscape);
};

export const closeModal = (popup) => {
    popup.classList.remove("popup_is-opened");
    popup.removeEventListener("click", handleCloseModalByClick);
    document.removeEventListener("keydown", handleCloseModalByEscape);
};

const handleCloseModalByEscape = (evt) => {
    if (evt.key === "Escape") {
        closeModal(document.querySelector(".popup_is-opened"));
    }
};

const handleCloseModalByClick = (evt) => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
};
