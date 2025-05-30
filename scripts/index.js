// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
// контейнер карточек
const cardsContainer = document.querySelector('.places__list');
// контейнер профиля
const profileContainer = document.querySelector('.profile');
// кнопка редактирования профиля
const profileEditButton = profileContainer.querySelector(
  '.profile__edit-button'
);
// кнопка добавления карточки
const profileAddCardButton = profileContainer.querySelector(
  '.profile__add-button'
);
// массив попап окон
const modals = document.querySelectorAll('.popup');

// @todo: Функция создания карточки
function createCard(cardName, cardLink, deleteCard, likeCard, viewImage) {
  // создаем экземпляр карточки клонированем шаблона
  const cardInstance = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  // заполняем карточку данными
  const cardImage = cardInstance.querySelector('.card__image');

  cardImage.src = cardLink;
  cardImage.alt = cardName;

  // вешаем обработчик события при клике на картинку
  cardImage.addEventListener('click', viewImage);

  cardInstance.querySelector('.card__title').textContent = cardName;

  // вешаем обработчик события на кнопку удаления
  cardInstance
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCard);

  // вешаем обработчик события на кнопку лайка
  cardInstance
    .querySelector('.card__like-button')
    .addEventListener('click', likeCard);

  return cardInstance;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  // событие срабатывает на кнопке
  // карточка является родителем для кнопки
  // значит чтобы удалить карточку, надо удалить родителя кнопки
  evt.target.closest('.places__item').remove();
}

// @todo: Функция лайка карточки
function likeCard(evt) {
  // переключаем класс кнопки лайка
  evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция просмотра большой картинки
function viewImage(evt) {
  console.log(evt.target);
  // заполняем модальное окно данными картинки
  // открываем модальное окно с большой картинкой
  // вешаем обработчик на кнопку Escape на document
}

// @todo: Функция вывода формы добавления карточки
function openAddCardForm() {
  const addCardForm = document.forms['new-place'];
  console.log('openAddCardForm');
}

// @todo: Функция валидации полей формы добавления карточки
function validateAddCardForm() {
  const addCardForm = document.forms['new-place'];
  console.log('validateAddCardForm');
}

// @todo: Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  const addCardForm = document.forms['new-place'];
  console.log('handleAddCardFormSubmit');
}

// @todo: Функция вывода формы редактирования профиля
function openEditProfileForm() {
  const editProfileForm = document.forms['new-edit-profile'];
  console.log('openEditProfileForm');
}

// @todo: Функция валидации полей формы редактирования профиля
function validateEditProfileForm() {
  const editProfileForm = document.forms['new-edit-profile'];
  console.log('validateEditProfileForm');
}

// @todo: Функция обработки отправки формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  const editProfileForm = document.forms['new-edit-profile'];
  console.log('handleEditProfileFormSubmit');
}

// @todo: Функция открытия модального окна
function openModal(modal) {
  console.log('openModal');
}

// @todo: Функция закрытия модального окна
function closeModal(modal) {
  console.log('closeModal');
}

// @todo: Функция вывода карточки
function displayCard(container, card, place = 'end') {
  if (place === 'start') {
    container.prepend(card);
  } else {
    container.append(card);
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

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  displayCard(
    cardsContainer,
    createCard(item.name, item.link, deleteCard, likeCard, viewImage)
  )
);

// @todo: Прикрепляем обработчик к кнопке редактирования профиля
profileEditButton.addEventListener('click', openEditProfileForm);

// @todo: Прикрепляем обработчик к кнопке добавления карточки
profileAddCardButton.addEventListener('click', openAddCardForm);

// @todo: Прикрепляем обработчик клика на кнопку закрытия попапа или на оверлей
modals.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
    // так мы проверим, что юзер кликнул на кнопку или оверлей
    if (
      evt.target.classList.contains('.popup__close') ||
      evt.target.classList.contains('.popup')
    ) {
      closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  });
});
