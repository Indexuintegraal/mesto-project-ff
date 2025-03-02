export function createCard(name, link, deleteHandler, likeHandler, openImagePopup, cardData, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title');
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = placesItem.querySelector('.card__like-button');
  const likeCount = placesItem.querySelector('.card__like-count');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeCount.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => deleteHandler(placesItem, cardData._id));
  }

  likeButton.addEventListener('click', () => likeHandler(likeButton, cardData._id, likeCount));
  cardImage.addEventListener('click', () => openImagePopup(name, link));

  return placesItem;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}