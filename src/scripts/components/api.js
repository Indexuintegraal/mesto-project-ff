const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
      authorization: '0f00c5bc-ccf0-4b81-a6de-c8d6484c5381',
      'Content-Type': 'application/json'
    }
  };
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about })
    })
      .then(checkResponse);
  }
  
  export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link })
    })
      .then(checkResponse);
  }
  
  export function deleteCardFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar: avatarUrl })
    })
      .then(checkResponse);
  }