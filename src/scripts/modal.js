// Функция открытия модального окна
export function openModal(modal) {
  // отображаем модальное окно
  modal.classList.toggle('popup_is-opened');
  // Прикрепляем обработчик клавиши Escape на document
  document.addEventListener('keydown', closeModalByEscape);
}

// Функция закрытия модального окна
export function closeModal(modal) {
  // скрываем модальное окно
  modal.classList.toggle('popup_is-opened');
  // удаляем обработчик клавиши Escape с document
  document.removeEventListener('keydown', closeModalByEscape);
}

export function closeModalByClick(evt) {
  // если кликнули на оверлей, то evt.target и есть модальное окно. закрываем его
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
  // если клингули по кнопке "Закрыть" (крестику), то модальное окно это ближайший к ней объект с классом .popup
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  }
}

// Функция закрытия модального окна по нажатию клавиши Escape
function closeModalByEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}
