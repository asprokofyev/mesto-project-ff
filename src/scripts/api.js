// данные для работы с сервером
const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41/',
  headers: {
    authorization: '3f733f72-cb5d-49ce-aae5-bd2f7b148895',
    'Content-Type': 'application/json',
  },
};

export function getInitialCards() {
  return fetch(apiConfig.baseUrl + 'cards', {
    method: 'GET',
    headers: apiConfig.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function getUserInfo() {
  return fetch(apiConfig.baseUrl + 'users/me', {
    method: 'GET',
    headers: apiConfig.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function updateUserInfo(user) {
  return fetch(apiConfig.baseUrl + 'users/me', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function updateUserAvatar(avatarUrl) {
  return fetch(apiConfig.baseUrl + 'users/me/avatar', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function saveNewCard(cardName, cardLink) {
  return fetch(apiConfig.baseUrl + 'cards', {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteCardFromServer(cardId) {
  return fetch(apiConfig.baseUrl + 'cards/' + cardId, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.status;
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
}

export function deleteLike(cardId) {
  return fetch(apiConfig.baseUrl + 'cards/likes/' + cardId, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function addLike(cardId) {
  return fetch(apiConfig.baseUrl + 'cards/likes/' + cardId, {
    method: 'PUT',
    headers: apiConfig.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}
