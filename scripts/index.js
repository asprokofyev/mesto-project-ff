// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardName, cardLink, deleteCard) {
  // создаем экземпляр карточки клонированем шаблона
  const cardInstance = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  // заполняем карточку данными
  const cardImage = cardInstance.querySelector('.card__image');

  cardImage.src = cardLink;
  cardImage.alt = cardName;
	
  cardInstance.querySelector('.card__title').textContent = cardName;

  // вешаем обработчик события на кнопку удаления
  cardInstance
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCard);

  return cardInstance;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  // событие срабатывает на кнопке
  // карточка является родителем для кнопки
  // значит чтобы удалить карточку, надо удалить родителя кнопки
  evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  cardsContainer.append(createCard(item.name, item.link, deleteCard))
);
