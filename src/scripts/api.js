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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getUserInfo() {
  return fetch(apiConfig.baseUrl + 'users/me', {
    method: 'GET',
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteCardFromServer(cardId) {
  return fetch(apiConfig.baseUrl + 'cards/' + cardId, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log(res.json());
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

// function updateQuote() {
//   fetch("https://api.kanye.rest")
//     .then((res) => res.json())
//     .then((data) => {
//       quoteElement.textContent = data.quote;
//     });
// }

// document.querySelector(".header__btn").addEventListener("click", updateQuote);

// //-----------------------------------

// // создаёт разметку для поста
// function createPostMarkup(post) {
//   return `
//     <div class="post">
//       <p class="post__title">${post.title}</p>
//       <p class="post__text">${post.body}</p>
//     </div>
//   `;
// }

// // вставляет разметку в DOM
// function addPostToDOM(container, markup) {
//   container.insertAdjacentHTML("afterbegin", markup);
// }

// function getPosts() {
//   // напишите код здесь
//   const container = document.querySelector(".container");

//   fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((res) => res.json())
//     .then((data) => {
//       data.forEach((post) => {
//         addPostToDOM(container, createPostMarkup(post));
//       });
//     });
// }

// getPosts();

// //--------------------------------------------

// // создаёт разметку для поста
// function createPostMarkup(post) {
//   return `
//     <div class="post">
//       <p class="post__title">${post.title}</p>
//       <p class="post__text">${post.body}</p>
//     </div>
//   `;
// }

// // вставляет разметку в DOM
// function addPostToDOM(container, markup) {
//   container.insertAdjacentHTML("afterbegin", markup);
// }

// function createPost(newPost) {
//   fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: JSON.stringify({
//       title: newPost.title,
//       body: newPost.body,
//     }),
//     headers: {
//       "Content-Type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((res) => res.json())
//     .then((post) => {
//       addPostToDOM(
//         document.querySelector(".container"),
//         createPostMarkup(post)
//       );
//     });
// }

// // обработчик сабмита формы
// document.forms.post.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const { title, text } = event.currentTarget.elements;

//   createPost({
//     title: title.value,
//     body: text.value,
//   });
// });

// //-------------------------------------------

// const quoteElement = document.querySelector("div.quote");

// fetch("https://api.kanye.rest")
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }

//     /* отклоняем промис, чтобы перейти
//     в блок catch, если сервер вернул ошибку */
//     return Promise.reject(`Что-то пошло не так: ${res.status}`);
//   })
//   .then((data) => {
//     quoteElement.textContent = data.quote;
//   })
//   .catch((err) => {
//     console.log(err); // "Что-то пошло не так: ..."
//   });

// //---------------------------

// const form = document.forms.search;
// const content = document.querySelector(".content");
// const result = document.querySelector(".content__result");
// const error = document.querySelector(".content__error");
// const spinner = document.querySelector(".spinner");

// function search(entity, entityId) {
//   return fetch(`https://swapi.nomoreparties.co/${entity}/${entityId}`);
// }

// function renderResult(text) {
//   result.textContent = text;
//   error.textContent = "";
// }

// function renderError(err) {
//   error.textContent = err;
//   result.textContent = "";
// }

// function renderLoading(isLoading) {
//   if (isLoading) {
//     spinner.classList.add("spinner_visible");
//     content.classList.add("content_hidden");
//   } else {
//     spinner.classList.remove("spinner_visible");
//     content.classList.remove("content_hidden");
//   }
// }

// form.addEventListener("submit", function submit(e) {
//   e.preventDefault();

//   renderLoading(true);
//   search(form.elements.entity.value, form.elements.entityId.value)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(res.status);
//     })
//     .then((res) => {
//       renderResult(res.name);
//     })
//     .catch((err) => {
//       renderError(`Ошибка: ${err}`);
//     })
//     .finally(() => {
//       renderLoading(false);
//     });
// });
