import { initialCards } from "./cards.js";

import { createCard, deleteCard, displayCard, handleLikeCard } from "./card.js";

import { closeModal, closeModalByClick, openModal } from "./modal.js";

import { enableValidation, clearValidation } from "./validation.js";

import { getInitialCards } from "./api.js";

// Данные пользователя
const userData = {
  name: "Жак-Ив Кусто",
  about: "Исследователь океана",
  avatar:
    "https://cs11.pikabu.ru/post_img/2020/06/11/7/1591871158127094932.jpg",
  _id: "100",
  cohort: "cohort-42",
};

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

  // создаем новую карточку по дынным из полей формы и выводим ее в начало списка карточек
  displayCard(
    cardsContainer,
    createCard(
      cardTemplate,
      "",
      newCardName.value,
      newCardImageURL.value,
      handleDeleteCard,
      handleLikeCard,
      viewImage,
      0,
      false,
      true
    ),
    "start"
  );

  // закрываем модальное окно
  closeModal(addCardModal);
  // сбрасываем значения в полях формы
  addCardForm.reset();
  // сбрасываем ошибки валидации
  clearValidation(addCardForm, validationConfig);
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

  // записываем значения из полей формы в профиль на странице
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  // закрвытие модального окна
  closeModal(editProfileModal);
  // сброс полей формы
  editProfileForm.reset();
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

  // записываем значения из поля формы в профиль на странице
  profileAvatar.style["background-image"] = `url('${avatarUrlInput.value}')`;

  // закрвытие модального окна
  closeModal(editAvatarModal);
  // сброс полей формы
  editAvatarForm.reset();
}

// Функция обработки клика по кнопке удаления карточки
function handleDeleteCard(cardId, cardElement) {
  // запоминаем данные удаляемой карточки
  idCardForDelete = cardId;
  сardForDelete = cardElement;

  // выводим модальное окно подтверждения
  openModal(confirmDeleteCard);
}

// Функция обработки клика по кнопке удаления карточки
function handleConfirmDeleteCard(evt) {
  // отмена обработки события по-умолчанию
  evt.preventDefault();

  // удаляем карточку
  deleteCard(idCardForDelete, сardForDelete);

  // закрвытие модального окна
  closeModal(confirmDeleteCard);
}

// Выводим карточки на страницу при первом запуске
initialCards.forEach((item) =>
  displayCard(
    cardsContainer,
    createCard(
      cardTemplate,
      item._id,
      item.name,
      item.link,
      handleDeleteCard,
      handleLikeCard,
      viewImage,
      item.likes.length,
      item.likes.includes(userData._id),
      item.owner._id === userData._id
    )
  )
);

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
