// @todo: Configuration
const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-14",
    headers : {
        "Content-Type": "application/json",
        authorization: "2259a223-61a4-4e72-9381-4cfd27fd8937"
    }
};

// @todo: Handle Response
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// @todo: Universal Request Function
const request = (endpoint, options) => {
    const url = `${config.baseUrl}${endpoint}`;
    return fetch(url, options).then(handleResponse);
};

// @todo: Get User Info
export const getUser = () => {
    return request('/users/me', {
        headers: config.headers
    });
};

// @todo: Get Init Cards From Server
export const getInitCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(handleResponse);
};

// @todo: Edit Profile
export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
    .then(handleResponse);
};

// @todo: Post New Card
export const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
    .then(handleResponse);
};

// @todo: Remove Card
export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse);
};

// @todo: Enable Card Like
export const clickCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleResponse);
};

// @todo: Remove Card Like
export const deleteCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse);
};

// @todo: Update Avatar
export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${avatar}`
        })
    })
    .then(handleResponse);
};