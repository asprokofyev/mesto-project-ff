import { initialCards } from "./cards.js";

import { createCard, deleteCard, displayCard, likeCard } from "./card.js";

import { closeModal, closeModalByClick, openModal } from "./modal.js";

// данные для работы с сервером
const groupId = "wff-cohort-41";
const myToken = "3f733f72-cb5d-49ce-aae5-bd2f7b148895";

// сообщение об ошибке и регулярное выражение
const errorWrongSymbols =
  "Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.";
const regexpWrongSymbols = "/[a-zа-я0-9ё\\- ]+/gi";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
// контейнер карточек
const cardsContainer = document.querySelector(".places__list");
// контейнер профиля
const profileContainer = document.querySelector(".profile");
// имя в профиле
const profileTitle = profileContainer.querySelector(".profile__title");
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

// форма добавления новой карточки
const addCardForm = document.forms["new-place"];
// форма редактирования профиля
const editProfileForm = document.forms["edit-profile"];
// поле Имя
const profileNameInput = editProfileForm.name;
// поле Занятие
const profileDescriptionInput = editProfileForm.description;

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
      newCardName.value,
      newCardImageURL.value,
      deleteCard,
      likeCard,
      viewImage
    ),
    "start"
  );

  // закрываем модальное окно
  closeModal(addCardModal);
  // сбрасываем значения в полях формы
  addCardForm.reset();
}

// Функция вывода формы редактирования профиля
function openEditProfileForm() {
  // получаем текущие данные профиля со страницы и заполняем поля формы
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

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

// Выводим карточки на страницу при первом запуске
initialCards.forEach((item) =>
  displayCard(
    cardsContainer,
    createCard(
      cardTemplate,
      item.name,
      item.link,
      deleteCard,
      likeCard,
      viewImage
    )
  )
);

// Прикрепляем обработчик к кнопке редактирования профиля
profileEditButton.addEventListener("click", openEditProfileForm);

// Прикрепляем обработчик к кнопке добавления карточки
profileAddCardButton.addEventListener("click", openAddCardForm);

//Прикрепляем обработчик клика на кнопку закрытия попапа или на оверлей
modals.forEach((modal) => {
  modal.addEventListener("click", closeModalByClick);
});

// Прикрепляем обработчик отправки формы редактирвоания профиля
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Прикрепляем обработчик отправки формы добавления новой карточки
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
