// массив модальных окон
export const modals = document.querySelectorAll('.popup');

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

// Функция закрытия модального окна по нажатию клавиши Escape
export function closeModalByEscape(evt) {
  if (evt.key === 'Escape') {
    // находим открытое модальное окно и закрываем его
    modals.forEach((modal) => {
      if (modal.classList.contains('popup_is-opened')) {
        closeModal(modal);
      }
    });
  }
}
