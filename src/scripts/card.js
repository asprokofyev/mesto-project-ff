// Функция создания карточки
export function createCard(
  cardTemplate,
  handleDeleteCard,
  handleLikeCard,
  viewImage,
  isLiked = false,
  isDeleted = true,
  cardItem
) {
  // создаем экземпляр карточки клонированем шаблона
  const cardInstance = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // заполняем карточку данными
  const cardImage = cardInstance.querySelector(".card__image");
  const likesCounter = cardInstance.querySelector(".card__like-counter");
  const likeButton = cardInstance.querySelector(".card__like-button");

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  likesCounter.textContent = cardItem.likes.length;

  // Прикрепляем обработчик события при клике на картинку
  cardImage.addEventListener("click", viewImage);

  cardInstance.querySelector(".card__title").textContent = cardItem.name;

  // Если карточку можно удалить, то прикрепляем обработчик события на кнопку удаления
  if (isDeleted) {
    cardInstance
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        handleDeleteCard(cardItem._id, cardInstance);
      });
  } else {
    // иначе скрываем кнопку удаления
    cardInstance.querySelector(".card__delete-button").style.display = "none";
  }

  // если владелец карточки ранее лайкнул карточки, то надо это отобразить
  if (isLiked) {
    likeCard(likeButton);
  }
  // Прикрепляем обработчик события на кнопку лайка
  likeButton.addEventListener("click", () => {
    handleLikeCard(cardItem._id, likeButton, likesCounter, isLiked);
  });

  return cardInstance;
}

// Функция отображения/скытия лайка карточки
export function likeCard(likeButtonElement) {
  // переключаем класс кнопки лайка
  likeButtonElement.classList.toggle("card__like-button_is-active");
}

// Функция проверки ставил я лайк карточке или нет
// ищет в массиве пользователей, поставивших лайк, пользователя с моим _id
export function iLikeThis(likes, myId) {
  let isLike = false;
  for (let i = 0; i < likes.length; i++) {
    if (likes[i]._id === myId) {
      isLike = true;
      break;
    }
  }
  return isLike;
}

// Функция удаления карточки
export function deleteCardFromPage(cardElement) {
  cardElement.remove();
}
