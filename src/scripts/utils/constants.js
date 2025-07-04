// DOM узлы
// контейнер карточек
export const cardsContainer = document.querySelector('.places__list');
// контейнер профиля
const profileContainer = document.querySelector('.profile');
// имя в профиле
export const profileTitle = profileContainer.querySelector('.profile__title');
// аватар в профиле
export const profileAvatar = profileContainer.querySelector('.profile__image');
// описание в профиле
export const profileDescription = profileContainer.querySelector(
  '.profile__description'
);
// кнопка редактирования профиля
export const profileEditButton = profileContainer.querySelector(
  '.profile__edit-button'
);
// кнопка добавления карточки
export const profileAddCardButton = profileContainer.querySelector(
  '.profile__add-button'
);

// массив модальных окон
export const modals = document.querySelectorAll('.popup');
// модальное окно с формой добавления новой карточки
export const addCardModal = document.querySelector('.popup_type_new-card');
// модальное окно для просмотра большой картинки
export const viewImageModal = document.querySelector('.popup_type_image');
// элемент картинки в модальном окне просмотра картинки
export const viewImageElement = viewImageModal.querySelector('.popup__image');
// элемент подписи к картинке в модальном окне просмотра картинки
export const viewImageCaptionElement =
  viewImageModal.querySelector('.popup__caption');
// модальное окно с формой редактирования профиля
export const editProfileModal = document.querySelector('.popup_type_edit');
// модальное окно с формой редактирования аватара
export const editAvatarModal = document.querySelector('.popup_type_avatar');
// модальное окно с формой подтверждения удаления карточки
export const confirmDeleteCard = document.querySelector('.popup_type_confirm');

// форма добавления новой карточки
export const addCardForm = document.forms['new-place'];
// форма редактирования профиля
export const editProfileForm = document.forms['edit-profile'];
// поле Имя
export const profileNameInput = editProfileForm.name;
// поле Занятие
export const profileDescriptionInput = editProfileForm.description;
// форма редактирования аватара
export const editAvatarForm = document.forms['edit-avatar'];
// поле url аватара
export const avatarUrlInput = editAvatarForm.elements['avatar-link'];
// форма подтверждения удаления карточки
export const confirmDeleteCardForm = document.forms['confirm-delete-card'];

// конфиг валидатора
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

// данные для работы с сервером
export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41/',
  headers: {
    authorization: '3f733f72-cb5d-49ce-aae5-bd2f7b148895',
    'Content-Type': 'application/json',
  },
};
