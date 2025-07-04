import './pages/index.css';

import {
  addCardForm,
  addCardModal,
  avatarUrlInput,
  cardsContainer,
  confirmDeleteCard,
  confirmDeleteCardForm,
  editAvatarForm,
  editAvatarModal,
  editProfileForm,
  editProfileModal,
  modals,
  profileAddCardButton,
  profileAvatar,
  profileDescription,
  profileDescriptionInput,
  profileEditButton,
  profileNameInput,
  profileTitle,
  validationConfig,
  viewImageCaptionElement,
  viewImageElement,
  viewImageModal,
} from './scripts/utils/constants.js';

import {
  createCard,
  deleteCardFromPage,
  iLikeThis,
  likeCard,
} from './scripts/card.js';

import { closeModal, closeModalByClick, openModal } from './scripts/modal.js';

import { clearValidation, enableValidation } from './scripts/validation.js';

import {
  addLike,
  deleteCardFromServer,
  deleteLike,
  getInitialCards,
  getUserInfo,
  saveNewCard,
  updateUserAvatar,
  updateUserInfo,
} from './scripts/api.js';

// Данные пользователя
let userData = null;

// данные удаляемой карточки для передачи между обработчиком иконки удаления и окном подтверждения удалений
let idCardForDelete;
let сardForDelete;

// Функция просмотра большой картинки
function viewImage(evt) {
  // заполняем модальное окно данными картинки
  viewImageElement.src = evt.target.src;
  viewImageElement.alt = evt.target.alt;
  viewImageCaptionElement.textContent = evt.target.alt;

  // открываем модальное окно с большой картинкой
  openModal(viewImageModal);
}

// Функция вывода формы добавления карточки
function openAddCardForm() {
  // сбрасываем ошибки валидации
  clearValidation(addCardForm, validationConfig);
  // открываем модальное окно
  openModal(addCardModal);
}

// Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  const newCardName = addCardForm.elements['place-name'];
  const newCardImageURL = addCardForm.link;

  // сбрасываем обработку события по-умолчанию
  evt.preventDefault();

  // меняем надпись на кнопке...
  renderLoading(true, addCardModal);
  // сохраняем данные на сервере...
  saveNewCard(newCardName.value, newCardImageURL.value)
    .then((card) => {
      // создаем новую карточку по дынным из полей формы и выводим ее в начало списка карточек
      displayCard(
        cardsContainer,
        createCard(
          card,
          {
            onDeleteCard: handleDeleteCard,
            onLikeCard: handleLikeCard,
            onViewImage: viewImage,
          },
          { isLiked: false, isDeleted: true }
        ),
        'start'
      );
      // закрываем модальное окно
      closeModal(addCardModal);
      // сбрасываем значения в полях формы
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // меняем надпись на кнопке
      renderLoading(false, addCardModal);
    });
}

// Функция вывода формы редактирования профиля
function openEditProfileForm() {
  // сбрасываем ошибки валидации
  clearValidation(editProfileForm, validationConfig);

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

  // записываем значения из полей формы в профиль пользлвателя
  userData.name = profileNameInput.value;
  userData.about = profileDescriptionInput.value;

  // меняем надпись на кнопке...
  renderLoading(true, editProfileModal);
  // сохраняем данные на сервере...
  updateUserInfo(userData)
    .then((user) => {
      userData = user;
      // обновляем профиль на странице
      displayProfile();
      // закрвытие модального окна
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // меняем надпись на кнопке
      renderLoading(false, editProfileModal);
    });
}

// Функция вывода формы редактирования аватара
function openEditAvatarForm() {
  // сбрасываем ошибки валидации
  clearValidation(editAvatarForm, validationConfig);

  // получаем текущий url аватара со страницы и заполняем поле формы
  const avatarUrl = profileAvatar.style['background-image'].match(
    /url\((['"])?(.*?)\1\)/
  )?.[2];
  avatarUrlInput.value = avatarUrl;

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
  updateUserAvatar(avatarUrlInput.value)
    .then((user) => {
      userData = user;
      // обновляем профиль на странице
      displayProfile();
      // закрвытие модального окна
      closeModal(editAvatarModal);
      // сброс полей формы
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // меняем надпись на кнопке
      renderLoading(false, editAvatarModal);
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

// Функция обработки клика по кнопке удаления карточки
function handleConfirmDeleteCard(evt) {
  // отмена обработки события по-умолчанию
  evt.preventDefault();

  // удаляем карточу с сервера...
  deleteCardFromServer(idCardForDelete)
    .then((status) => {
      // если карточка удалилась с сервера, то удаляем карточку со страницы
      if (status === 200) {
        deleteCardFromPage(сardForDelete);
      }
      // закрвытие модального окна
      closeModal(confirmDeleteCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция обработки клика по кнопке лайка
function handleLikeCard(
  cardId,
  likeButtonElement,
  likesCounterElement,
  isLiked
) {
  if (isLiked) {
    // если карточка мной лайкнута, то надо удалить лайк
    // сохраняем данные на сервере...
    deleteLike(cardId)
      .then((card) => {
        // обновляем количество лайков
        likesCounterElement.textContent = card.likes.length;
        // переключаем класс кнопки лайка
        likeCard(likeButtonElement);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // если карточка не лайкнута, то надо добавить лайк
    // сохраняем данные на сервере...
    addLike(cardId)
      .then((card) => {
        // обновляем количество лайков
        likesCounterElement.textContent = card.likes.length;
        // переключаем класс кнопки лайка
        likeCard(likeButtonElement);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Функция вывода всех карточек на страницу
function displayAllCards(cards) {
  cards.forEach((card) =>
    displayCard(
      cardsContainer,
      createCard(
        card,
        {
          onDeleteCard: handleDeleteCard,
          onLikeCard: handleLikeCard,
          onViewImage: viewImage,
        },
        {
          isLiked: iLikeThis(card.likes, userData._id),
          isDeleted: card.owner._id === userData._id,
        }
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
  profileAvatar.style['background-image'] = `url('${userData.avatar}')`;
}

// Функция вывода карточки в нужное место
function displayCard(container, card, place = 'end') {
  if (place === 'start') {
    container.prepend(card);
  } else {
    container.append(card);
  }
}

// Функция замены текста на кнопке формы на время сохранения информации на сервер
function renderLoading(isLoading, formElement) {
  const buttonElement = formElement.querySelector('.popup__button');
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}

// Загружаем данные пользователя и карточки с сервера и выводим на страницу при первом запуске
Promise.all([getInitialCards(), getUserInfo()])
  .then(([initialCards, user]) => {
    // данные пользователя понадобятся в других функциях, поэтому сохраняем в глобальной переменной
    userData = user;
    // выводим данные пользователя на страницу
    displayProfile();
    // выводим карточки на страницу
    displayAllCards(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// Прикрепляем обработчик к кнопке редактирования профиля
profileEditButton.addEventListener('click', openEditProfileForm);

// Прикрепляем обработчик к кнопке добавления карточки
profileAddCardButton.addEventListener('click', openAddCardForm);

// Прикрепляем обработчик к аватару для редактирования профиля
profileAvatar.addEventListener('click', openEditAvatarForm);

//Прикрепляем обработчик клика на кнопку закрытия попапа или на оверлей
modals.forEach((modal) => {
  modal.addEventListener('click', closeModalByClick);
});

// Прикрепляем обработчик отправки формы редактирвоания профиля
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Прикрепляем обработчик отправки формы добавления новой карточки
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// Прикрепляем обработчик отправки формы редактирования аватара
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);

// Прикрепляем обработчик формы подтверждения удаления карточки
confirmDeleteCardForm.addEventListener('submit', handleConfirmDeleteCard);

// включаем валидацию форм
enableValidation(validationConfig);
