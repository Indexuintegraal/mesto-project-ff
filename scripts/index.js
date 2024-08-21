const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, link){
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    placesItem.querySelector('.card__title').textContent = name;
    placesItem.querySelector('.card__image').src = link;
    placesList.append(placesItem);
    const deleteButton = placesItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    return placesItem;
}

function deleteCard(evt){
    const placesItem = evt.target.closest('.places__item');
    placesItem.remove();
}

initialCards.forEach(element => {const card = createCard(element.name, element.link)});
