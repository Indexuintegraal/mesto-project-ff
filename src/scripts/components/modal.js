export function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
  }
  
  export function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
  }
  
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  }
  
  export function setCloseListeners(modalElement) {
    const closeButton = modalElement.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(modalElement));
    modalElement.addEventListener('click', (evt) => {
      if (evt.target === modalElement) {
        closeModal(document.querySelector('.popup_is-opened'));
      }
    });
  }