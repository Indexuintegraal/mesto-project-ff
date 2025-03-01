export function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => handleEscClose(evt, modalElement));
  }
  
  export function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', (evt) => handleEscClose(evt, modalElement));
  }
  
  function handleEscClose(evt, modalElement) {
    if (evt.key === 'Escape') {
      closeModal(modalElement);
    }
  }
  
  export function setCloseListeners(modalElement) {
    const closeButton = modalElement.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(modalElement));
    modalElement.addEventListener('click', (evt) => {
      if (evt.target === modalElement) {
        closeModal(modalElement);
      }
    });
  }