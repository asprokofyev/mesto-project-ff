import {
  createCard,
  deleteCardFromPage,
  displayCard,
  likeCard,
  iLikeThis,
} from "./card.js";

import { closeModal, closeModalByClick, openModal } from "./modal.js";

import { clearValidation, enableValidation } from "./validation.js";

import {
  getInitialCards,
  getUserInfo,
  saveNewCard,
  updateUserInfo,
  deleteCardFromServer,
  deleteLike,
  addLike,
  updateUserAvatar,
  renderLoading,
} from "./api.js";

// Данные пользователя
let userData = null;

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// данные удаляемой карточки для передачи между обработчиком иконки удаления и окном подтверждения удалений
let idCardForDelete;
let сardForDelete;

// DOM узлы
// контейнер карточек
const cardsContainer = document.querySelector(".places__list");
// контейнер профиля
const profileContainer = document.querySelector(".profile");
// имя в профиле
const profileTitle = profileContainer.querySelector(".profile__title");
// аватар в профиле
const profileAvatar = profileContainer.querySelector(".profile__image");
// описание в профиле
const profileDescription = profileContainer.querySelector(
  ".profile__description"
);
// кнопка редактирования профиля
const profileEditButton = profileContainer.querySelector(
  ".profile__edit-button"
);
// кнопка добавления карточки
const profileAddCardButton = profileContainer.querySelector(
  ".profile__add-button"
);

// массив модальных окон
const modals = document.querySelectorAll(".popup");
// модальное окно с формой добавления новой карточки
const addCardModal = document.querySelector(".popup_type_new-card");
// модальное окно для просмотра большой картинки
const viewImageModal = document.querySelector(".popup_type_image");
// модальное окно с формой редактирования профиля
const editProfileModal = document.querySelector(".popup_type_edit");
// модальное окно с формой редактирования аватара
const editAvatarModal = document.querySelector(".popup_type_avatar");
// модальное окно с формой подтверждения удаления карточки
const confirmDeleteCard = document.querySelector(".popup_type_confirm");

// форма добавления новой карточки
const addCardForm = document.forms["new-place"];
// форма редактирования профиля
const editProfileForm = document.forms["edit-profile"];
// поле Имя
const profileNameInput = editProfileForm.name;
// поле Занятие
const profileDescriptionInput = editProfileForm.description;
// форма редактирования аватара
const editAvatarForm = document.forms["edit-avatar"];
// поле url аватара
const avatarUrlInput = editAvatarForm.elements["avatar-link"];
// форма подтверждения удаления карточки
const confirmDeleteCardForm = document.forms["confirm-delete-card"];

// конфиг валидатора
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
};

// Функция просмотра большой картинки
function viewImage(evt) {
  const image = viewImageModal.querySelector(".popup__image");
  const imageCaption = viewImageModal.querySelector(".popup__caption");

  // заполняем модальное окно данными картинки
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;

  // открываем модальное окно с большой картинкой
  openModal(viewImageModal);
}

// Функция вывода формы добавления карточки
function openAddCardForm() {
  // открываем модальное окно
  openModal(addCardModal);
}

// Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  const newCardName = addCardForm.elements["place-name"];
  const newCardImageURL = addCardForm.link;

  // сбрасываем обработку события по-умолчанию
  evt.preventDefault();

  // меняем надпись на кнопке...
  renderLoading(true, addCardModal);
  // сохраняем данные на сервере...
  Promise.all([saveNewCard(newCardName.value, newCardImageURL.value)])
    .then(([card]) => {
      // создаем новую карточку по дынным из полей формы и выводим ее в начало списка карточек
      displayCard(
        cardsContainer,
        createCard(
          cardTemplate,
          handleDeleteCard,
          handleLikeCard,
          viewImage,
          false,
          true,
          card
        ),
        "start"
      );
    })
    .finally(() => {
      // меняем надпись на кнопке
      renderLoading(false, addCardModal);
      // закрываем модальное окно
      closeModal(addCardModal);
      // сбрасываем значения в полях формы
      addCardForm.reset();
      // сбрасываем ошибки валидации
      clearValidation(addCardForm, validationConfig);
    });
}

// Функция вывода формы редактирования профиля
function openEditProfileForm() {
  // получаем текущие данные профиля со страницы и заполняем поля формы
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  // сбрасываем ошибки валидации
  clearValidation(editProfileForm, validationConfig);

  // открываем модальное окно
  openModal(editProfileModal);
}

// Функция обработки отправки формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  // отмена обработки события по-умолчанию
  evt.preventDefault();

  // записываем значения из полей формы в профиль пользлвателя
  userData.name = profileNameInput.value;
  userData.about = profileDescriptionInput.value;

  // меняем надпись на кнопке...
  renderLoading(true, editProfileModal);
  // сохраняем данные на сервере...
  Promise.all([updateUserInfo(userData)])
    .then(([user]) => {
      userData = user;
      // обновляем профиль на странице
      displayProfile();
    })
    .finally(() => {
      // меняем надпись на кнопке
      renderLoading(false, editProfileModal);
      // закрвытие модального окна
      closeModal(editProfileModal);
      // сброс полей формы
      editProfileForm.reset();
    });
}

// Функция вывода формы редактирования аватара
function openEditAvatarForm() {
  // получаем текущий url аватара со страницы и заполняем поле формы
  const avatarUrl = profileAvatar.style["background-image"].match(
    /url\((['"])?(.*?)\1\)/
  )?.[2];
  avatarUrlInput.value = avatarUrl;

  // сбрасываем ошибки валидации
  clearValidation(editAvatarForm, validationConfig);

  // открываем модальное окно
  openModal(editAvatarModal);
}

// Функция обработки отправки формы редактирования профиля
function handleEditAvatarFormSubmit(evt) {
  // отмена обработки события по-умолчанию
  evt.preventDefault();

  // меняем надпись на кнопке...
  renderLoading(true, editAvatarModal);
  // сохраняем данные на сервере...
  Promise.all([updateUserAvatar(avatarUrlInput.value)])
    .then(([user]) => {
      userData = user;
      // обновляем профиль на странице
      displayProfile();
    })
    .finally(() => {
      // меняем надпись на кнопке
      renderLoading(false, editAvatarModal);
      // закрвытие модального окна
      closeModal(editProfileModal);
      // сброс полей формы
      editAvatarForm.reset();
    });
}

// Функция обработки клика по кнопке удаления карточки
function handleDeleteCard(cardId, cardElement) {
  // запоминаем данные удаляемой карточки
  idCardForDelete = cardId;
  сardForDelete = cardElement;

  // выводим модальное окно подтверждения
  openModal(confirmDeleteCard);
}

// Функция обработки клика по кнопке лайка
export function handleLikeCard(
  cardId,
  likeButtonElement,
  likesCounterElement,
  isLiked
) {
  if (isLiked) {
    // если карточка мной лайкнута, то надо удалить лайк
    // сохраняем данные на сервере...
    Promise.all([deleteLike(cardId)]).then(([card]) => {
      // обновляем количество лайков
      likesCounterElement.textContent = card.likes.length;
      // переключаем класс кнопки лайка
      likeCard(likeButtonElement);
    });
  } else {
    // если карточка не лайкнута, то надо добавить лайк
    // сохраняем данные на сервере...
    Promise.all([addLike(cardId)]).then(([card]) => {
      // обновляем количество лайков
      likesCounterElement.textContent = card.likes.length;
      // переключаем класс кнопки лайка
      likeCard(likeButtonElement);
    });
  }
}

// Функция обработки клика по кнопке удаления карточки
function handleConfirmDeleteCard(evt) {
  // отмена обработки события по-умолчанию
  evt.preventDefault();

  // удаляем карточу с сервера...
  Promise.all([deleteCardFromServer(idCardForDelete)]).then(([status]) => {
    // если карточка удалилась с сервера, то удаляем карточку со страницы
    if (status === 200) {
      deleteCardFromPage(сardForDelete);
    }
    // закрвытие модального окна
    closeModal(confirmDeleteCard);
  });
}

// Функция вывода всех карточек на страницу
function displayAllCards(cards) {
  cards.forEach((item) =>
    displayCard(
      cardsContainer,
      createCard(
        cardTemplate,
        handleDeleteCard,
        handleLikeCard,
        viewImage,
        iLikeThis(item.likes, userData._id),
        item.owner._id === userData._id,
        item
      )
    )
  );
}

// Функция вывода профиля
function displayProfile() {
  // выводим имя
  profileTitle.textContent = userData.name;
  // выводим описание
  profileDescription.textContent = userData.about;
  // выводим аватар
  profileAvatar.style["background-image"] = `url('${userData.avatar}')`;
}

// Загружаем данные пользователя и карточки с сервера и выводим на страницу при первом запуске
Promise.all([getInitialCards(), getUserInfo()]).then(([initialCards, user]) => {
  // данные пользователя понадобятся в других функциях, поэтому сохраняем в глобальной переменной
  userData = user;
  // выводим данные пользователя на страницу
  displayProfile();
  // выводим карточки на страницу
  displayAllCards(initialCards);
});

// Прикрепляем обработчик к кнопке редактирования профиля
profileEditButton.addEventListener("click", openEditProfileForm);

// Прикрепляем обработчик к кнопке добавления карточки
profileAddCardButton.addEventListener("click", openAddCardForm);

// Прикрепляем обработчик к аватару для редактирования профиля
profileAvatar.addEventListener("click", openEditAvatarForm);

//Прикрепляем обработчик клика на кнопку закрытия попапа или на оверлей
modals.forEach((modal) => {
  modal.addEventListener("click", closeModalByClick);
});

// Прикрепляем обработчик отправки формы редактирвоания профиля
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Прикрепляем обработчик отправки формы добавления новой карточки
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

// Прикрепляем обработчик отправки формы редактирования аватара
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

// Прикрепляем обработчик формы подтверждения удаления карточки
confirmDeleteCardForm.addEventListener("submit", handleConfirmDeleteCard);

// включаем валидацию форм
enableValidation(validationConfig);
