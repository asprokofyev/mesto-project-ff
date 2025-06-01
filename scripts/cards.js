// массив карточек для первоначального вывода на странице
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Функция создания карточки
export function createCard(
  cardTemplate,
  cardName,
  cardLink,
  deleteCard,
  likeCard,
  viewImage
) {
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
export function deleteCard(evt) {
  // событие срабатывает на кнопке
  // карточка является родителем для кнопки
  // значит чтобы удалить карточку, надо удалить родителя кнопки
  evt.target.closest('.places__item').remove();
}

// Функция лайка карточки
export function likeCard(evt) {
  // переключаем класс кнопки лайка
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция вывода карточки в нужное место
export function displayCard(container, card, place = 'end') {
  if (place === 'start') {
    container.prepend(card);
  } else {
    container.append(card);
  }
}
