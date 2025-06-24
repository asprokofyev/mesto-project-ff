// Функция создания карточки
export function createCard(
  cardTemplate,
  cardId,
  cardName,
  cardLink,
  handleDeleteCard,
  handleLikeCard,
  viewImage,
  likesCount = 0,
  isLiked = false,
  isDeleted = true
) {
  // создаем экземпляр карточки клонированем шаблона
  const cardInstance = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  // заполняем карточку данными
  const cardImage = cardInstance.querySelector('.card__image');
  const likesCounter = cardInstance.querySelector('.card__like-counter');
  const likeButton = cardInstance.querySelector('.card__like-button');

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  likesCounter.textContent = likesCount;

  // Прикрепляем обработчик события при клике на картинку
  cardImage.addEventListener('click', viewImage);

  cardInstance.querySelector('.card__title').textContent = cardName;

  // Если карточку можно удалить, то прикрепляем обработчик события на кнопку удаления
  if (isDeleted) {
    cardInstance
      .querySelector('.card__delete-button')
      .addEventListener('click', () => {
        handleDeleteCard(cardId, cardInstance);
      });
  } else {
    // иначе скрываем кнопку удаления
    cardInstance.querySelector('.card__delete-button').style.display = 'none';
  }

  // если владелец карточки ранее лайкнул карточки, то надо это отобразить
  if (isLiked) {
    LikeCard(likeButton);
  }
  // Прикрепляем обработчик события на кнопку лайка
  likeButton.addEventListener('click', handleLikeCard);

  return cardInstance;
}

// Функция обработки клика по кнопке лайка
export function handleLikeCard(evt) {
  // переключаем класс кнопки лайка
  LikeCard(evt.target);
}

// Функция отображения/скытия лайка карточки
function LikeCard(cardItem) {
  // переключаем класс кнопки лайка
  cardItem.classList.toggle('card__like-button_is-active');
}

// Функция вывода карточки в нужное место
export function displayCard(container, card, place = 'end') {
  if (place === 'start') {
    container.prepend(card);
  } else {
    container.append(card);
  }
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  cardElement.remove();
}
