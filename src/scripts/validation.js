// @todo: Render Input Error
const renderInputError = (form, input, errorMessage, validationConfig) => {
    const error = form.querySelector(`.${input.name}-error`);
    input.classList.add(validationConfig.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(validationConfig.errorClass);
};

// @todo: Hide Input Error
const hideInputError = (form, input, validationConfig) => {
    const error = form.querySelector(`.${input.name}-error`);
    input.classList.remove(validationConfig.inputErrorClass);
    error.classList.remove(validationConfig.errorClass);
    error.textContent = "";
};

// @todo: Validity Check
const isValid = (form, input, validationConfig) => {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }
    if (!input.validity.valid) {
        renderInputError(
            form,
            input,
            input.validationMessage,
            validationConfig
        );
    } else {
        hideInputError(form, input, validationConfig);
    }
};

// @todo: Block (not active) Submit Btn
const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const disableBtn = (btn, validationConfig) => {
    btn.disabled = true;
    btn.classList.add(validationConfig.inactiveButtonClass);
};

// @todo: Toggle Btn State (block/unblock button)
const toggleBtnState = (inputList, btn, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        disableBtn(btn, validationConfig);
    } else {
        btn.disabled = false;
        btn.classList.remove(validationConfig.inactiveButtonClass);
    }
};

// @todo: Set Event Listeners for All Fields
const setEventListeners = (form, validationConfig) => {
    const inputList = Array.from(
        form.querySelectorAll(validationConfig.inputSelector)
    );
    const btn = form.querySelector(validationConfig.submitButtonSelector);
    toggleBtnState(inputList, btn, validationConfig);
    inputList.forEach((input) => {
        input.addEventListener("input", () => {
            isValid(form, input, validationConfig);
            toggleBtnState(inputList, btn, validationConfig);
        });
    });
};

// @todo: Add Listeners to All Forms
export const enableValidation = (validationConfig) => {
    const formList = Array.from(
        document.querySelectorAll(validationConfig.formSelector)
    );
    formList.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, validationConfig);
    });
};

// @todo: Reset Validation, Make Btn Inactive
export const resetValidation = (form, validationConfig) => {
    const inputList = Array.from(
        form.querySelectorAll(validationConfig.inputSelector)
    );
    const btn = form.querySelector(validationConfig.submitButtonSelector);

    if (btn) {
        disableBtn(btn, validationConfig);
    }

    inputList.forEach((input) => {
        hideInputError(form, input, validationConfig);
    });
};
