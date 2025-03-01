import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, toggleLike } from './components/card';
import { openModal, closeModal, setCloseListeners } from './components/modal';

import avatarImage from '../images/avatar.jpg';
import logoImage from '../images/logo.svg';

const placesList = document.querySelector('.places__list');
const profileImageElement = document.querySelector('.profile__image');
const logoElement = document.querySelector('.logo');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editPopup = document.querySelector('#edit-profile-popup');
const addPopup = document.querySelector('#add-card-popup');
const imagePopup = document.querySelector('#image-preview-popup');
const editFormElement = editPopup.querySelector('.popup__form');
const addFormElement = addPopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('input[name="name"]');
const jobInput = editFormElement.querySelector('input[name="description"]');
const cardNameInput = addFormElement.querySelector('input[name="name"]');
const cardLinkInput = addFormElement.querySelector('input[name="link"]');

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = createCard(name, link, deleteCard, toggleLike, openImagePopup);
  if (newCard) {
    placesList.prepend(newCard);
  }
  closeModal(addPopup);
  addFormElement.reset();
}

function openImagePopup(name, link) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

profileImageElement.style.backgroundImage = `url(${avatarImage})`;
logoElement.src = logoImage;

initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, deleteCard, toggleLike, openImagePopup);
  if (card) placesList.append(card);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

addButton.addEventListener('click', () => openModal(addPopup));

editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

setCloseListeners(editPopup);
setCloseListeners(addPopup);
setCloseListeners(imagePopup);