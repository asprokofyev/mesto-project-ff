// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
// контейнер карточек
const cardsContainer = document.querySelector(".places__list");
// контейнер профиля
const profileContainer = document.querySelector(".profile");
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

// Функция создания карточки
function createCard(cardName, cardLink, deleteCard, likeCard, viewImage) {
  // создаем экземпляр карточки клонированем шаблона
  const cardInstance = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // заполняем карточку данными
  const cardImage = cardInstance.querySelector(".card__image");

  cardImage.src = cardLink;
  cardImage.alt = cardName;

  // вешаем обработчик события при клике на картинку
  cardImage.addEventListener("click", viewImage);

  cardInstance.querySelector(".card__title").textContent = cardName;

  // вешаем обработчик события на кнопку удаления
  cardInstance
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  // вешаем обработчик события на кнопку лайка
  cardInstance
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

  return cardInstance;
}

// Функция удаления карточки
function deleteCard(evt) {
  // событие срабатывает на кнопке
  // карточка является родителем для кнопки
  // значит чтобы удалить карточку, надо удалить родителя кнопки
  evt.target.closest(".places__item").remove();
}

// Функция лайка карточки
function likeCard(evt) {
  // переключаем класс кнопки лайка
  evt.target.classList.toggle("card__like-button_is-active");
}

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

  // вешаем обработчик валидации полей

  // вешаем обработчик отправки форму
}

// Функция валидации полей формы добавления карточки
function validateAddCardForm() {
  console.log("validateAddCardForm");
}

// Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  console.log("handleAddCardFormSubmit");
}

// Функция вывода формы редактирования профиля
function openEditProfileForm() {
  const profileTitle = profileContainer.querySelector(".profile__title");
  const profileDescription = profileContainer.querySelector(
    ".profile__description"
  );
  const profileNameInput = editProfileForm.name;
  const profileDescriptionInput = editProfileForm.description;

  // получаем текущие данные профиля со страницы и заполняем поля формы
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  // открываем модальное окно
  openModal(editProfileModal);

  // вешаем обработчик валидации полей

  // вешаем обработчик отправки форму
}

// Функция валидации полей формы редактирования профиля
function validateEditProfileForm() {
  console.log("validateEditProfileForm");
}

// Функция обработки отправки формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  console.log("handleEditProfileFormSubmit");
}

// Функция открытия модального окна
function openModal(modal) {
  // отображаем модальное окно
  modal.classList.toggle("popup_is-opened");
  // вешаем обработчик клавиши Escape на document
  document.addEventListener("keydown", closeModalByEscape);
}

// Функция закрытия модального окна
function closeModal(modal) {
  // скрываем модальное окно
  modal.classList.toggle("popup_is-opened");
  // удаляем обработчик клавиши Escape с document
  document.removeEventListener("keydown", closeModalByEscape);
}

// Функция вывода карточки в нужное место
function displayCard(container, card, place = "end") {
  if (place === "start") {
    container.prepend(card);
  } else {
    container.append(card);
  }
}

// Функция закрытия модального окна по нажатию клавиши Escape
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    // находим открытое модальное окно и закрываем его
    modals.forEach((modal) => {
      if (modal.classList.contains("popup_is-opened")) {
        closeModal(modal);
      }
    });
  }
}

/*
  // Находим форму в DOM
  const formElement = // Воспользуйтесь методом querySelector()
  // Находим поля формы в DOM
  const nameInput = // Воспользуйтесь инструментом .querySelector()
  const jobInput = // Воспользуйтесь инструментом .querySelector()

  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function handleFormSubmit(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                  // Так мы можем определить свою логику отправки.
                                                  // О том, как это делать, расскажем позже.

      // Получите значение полей jobInput и nameInput из свойства value

      // Выберите элементы, куда должны быть вставлены значения полей

      // Вставьте новые значения с помощью textContent
  }
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formElement.addEventListener('submit', handleFormSubmit);
  // открытие окна с формой
  // валидация и сохранение данных формы
*/

// Выводим карточки на страницу при первом запуске
initialCards.forEach((item) =>
  displayCard(
    cardsContainer,
    createCard(item.name, item.link, deleteCard, likeCard, viewImage)
  )
);

// Прикрепляем обработчик к кнопке редактирования профиля
profileEditButton.addEventListener("click", openEditProfileForm);

// Прикрепляем обработчик к кнопке добавления карточки
profileAddCardButton.addEventListener("click", openAddCardForm);

//Прикрепляем обработчик клика на кнопку закрытия попапа или на оверлей
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    // так мы проверим, что юзер кликнул на кнопку или оверлей
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  });
});
