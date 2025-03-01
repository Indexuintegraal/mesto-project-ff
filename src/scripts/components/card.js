export function createCard(name, link, deleteCardHandler, likeHandler, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placesItem.querySelector('.card__image');
    const cardTitle = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button');
    const likeButton = placesItem.querySelector('.card__like-button');
  
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
  
    deleteButton.addEventListener('click', () => deleteCardHandler(placesItem));
    likeButton.addEventListener('click', () => likeHandler(likeButton));
    cardImage.addEventListener('click', () => openImagePopup(name, link));
  
    return placesItem;
  }
  
  export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  export function toggleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }