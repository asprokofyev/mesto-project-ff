///////////////////////////////////////////
// функционал проектной работы 5 спринта //
///////////////////////////////////////////

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardName, cardLink, deleteCard) {
  // создаем экземпляр карточки клонированем шаблона
  const cardInstance = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // заполняем карточку данными
  const cardImage = cardInstance.querySelector(".card__image");

  cardImage.src = cardLink;
  cardImage.alt = cardName;

  cardInstance.querySelector(".card__title").textContent = cardName;

  // вешаем обработчик события на кнопку удаления
  cardInstance
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return cardInstance;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  // событие срабатывает на кнопке
  // карточка является родителем для кнопки
  // значит чтобы удалить карточку, надо удалить родителя кнопки
  evt.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  cardsContainer.append(createCard(item.name, item.link, deleteCard))
);

///////////////////////////////////////////
// функционал проектной работы 6 спринта //
///////////////////////////////////////////

// @todo: DOM узлы
const profileContainer = document.querySelector(".profile");
const profileEditButton = profileContainer.querySelector(
  ".profile__edit-button"
);
const profileAddCardButton = profileContainer.querySelector(
  ".profile__add-button"
);

// @todo: Функция редактирования профиля
// открытие окна и заполнение формы текущими данными
// валидация и сохранение данных формы

// @todo: Функция лайка карточки

// @todo: Функция добавления карточки
// открытие окна с формой
// валидация и сохранение данных формы

// @todo: Функция просмотра картинки
// открытие окна с фотографией

// @todo: закрытие модальных окон

//

const modals = document.querySelectorAll(".popup");

//console.log(modals);

/*modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('.popup__close')|| event.target.classList.contains('.popup')) { // так мы проверим, что юзер кликнул на кнопку или оверлей
      closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  })
})*/
