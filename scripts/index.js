// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
// контейнер карточек
const cardsContainer = document.querySelector('.places__list');
// контейнер профиля
const profileContainer = document.querySelector('.profile');
// имя в профиле
const profileTitle = profileContainer.querySelector('.profile__title');
// описание в профиле
const profileDescription = profileContainer.querySelector(
  '.profile__description'
);
// кнопка редактирования профиля
const profileEditButton = profileContainer.querySelector(
  '.profile__edit-button'
);
// кнопка добавления карточки
const profileAddCardButton = profileContainer.querySelector(
  '.profile__add-button'
);

// массив модальных окон
const modals = document.querySelectorAll('.popup');
// модальное окно с формой добавления новой карточки
const addCardModal = document.querySelector('.popup_type_new-card');
// модальное окно для просмотра большой картинки
const viewImageModal = document.querySelector('.popup_type_image');
// модальное окно с формой редактирования профиля
const editProfileModal = document.querySelector('.popup_type_edit');

// форма добавления новой карточки
const addCardForm = document.forms['new-place'];
// форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
// поле Имя
const profileNameInput = editProfileForm.name;
// поле Занятие
const profileDescriptionInput = editProfileForm.description;

// Функция создания карточки
function createCard(cardName, cardLink, deleteCard, likeCard, viewImage) {
  // создаем экземпляр карточки клонированем шаблона
  const cardInstance = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  // заполняем карточку данными
  const cardImage = cardInstance.querySelector('.card__image');

  cardImage.src = cardLink;
  cardImage.alt = cardName;

  // Прикрепляем обработчик события при клике на картинку
  cardImage.addEventListener('click', viewImage);

  cardInstance.querySelector('.card__title').textContent = cardName;

  // Прикрепляем обработчик события на кнопку удаления
  cardInstance
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCard);

  // Прикрепляем обработчик события на кнопку лайка
  cardInstance
    .querySelector('.card__like-button')
    .addEventListener('click', likeCard);

  return cardInstance;
}

// Функция удаления карточки
function deleteCard(evt) {
  // событие срабатывает на кнопке
  // карточка является родителем для кнопки
  // значит чтобы удалить карточку, надо удалить родителя кнопки
  evt.target.closest('.places__item').remove();
}

// Функция лайка карточки
function likeCard(evt) {
  // переключаем класс кнопки лайка
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция просмотра большой картинки
function viewImage(evt) {
  const image = viewImageModal.querySelector('.popup__image');
  const imageCaption = viewImageModal.querySelector('.popup__caption');

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
  const newCardName = addCardForm.elements['place-name'];
  const newCardImageURL = addCardForm.link;

  // сбрасываем обработку события по-умолчанию
  evt.preventDefault();

  // создаем новую карточку по дынным из полей формы и выводим ее в начало списка карточек
  displayCard(
    cardsContainer,
    createCard(
      newCardName.value,
      newCardImageURL.value,
      deleteCard,
      likeCard,
      viewImage
    ),
    'start'
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

// Функция открытия модального окна
function openModal(modal) {
  // отображаем модальное окно
  modal.classList.toggle('popup_is-opened');
  // Прикрепляем обработчик клавиши Escape на document
  document.addEventListener('keydown', closeModalByEscape);
}

// Функция закрытия модального окна
function closeModal(modal) {
  // скрываем модальное окно
  modal.classList.toggle('popup_is-opened');
  // удаляем обработчик клавиши Escape с document
  document.removeEventListener('keydown', closeModalByEscape);
}

// Функция вывода карточки в нужное место
function displayCard(container, card, place = 'end') {
  if (place === 'start') {
    container.prepend(card);
  } else {
    container.append(card);
  }
}

// Функция закрытия модального окна по нажатию клавиши Escape
function closeModalByEscape(evt) {
  if (evt.key === 'Escape') {
    // находим открытое модальное окно и закрываем его
    modals.forEach((modal) => {
      if (modal.classList.contains('popup_is-opened')) {
        closeModal(modal);
      }
    });
  }
}

// Выводим карточки на страницу при первом запуске
initialCards.forEach((item) =>
  displayCard(
    cardsContainer,
    createCard(item.name, item.link, deleteCard, likeCard, viewImage)
  )
);

// Прикрепляем обработчик к кнопке редактирования профиля
profileEditButton.addEventListener('click', openEditProfileForm);

// Прикрепляем обработчик к кнопке добавления карточки
profileAddCardButton.addEventListener('click', openAddCardForm);

//Прикрепляем обработчик клика на кнопку закрытия попапа или на оверлей
modals.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
    // так мы проверим, что юзер кликнул на кнопку или оверлей
    if (
      evt.target.classList.contains('popup__close') ||
      evt.target.classList.contains('popup')
    ) {
      closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  });
});

// Прикрепляем обработчик отправки формы редактирвоания профиля
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Прикрепляем обработчик отправки формы добавления новой карточки
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);