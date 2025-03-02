import '../pages/index.css';
import { createCard, deleteCard } from './components/card';
import { openModal, closeModal, setCloseListeners } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, deleteCardFromServer, likeCard, unlikeCard, updateAvatar } from './components/api';

import logoImage from '../images/logo.svg';

const placesList = document.querySelector('.places__list');
const profileImageElement = document.querySelector('.profile__image');
const logoElement = document.querySelector('.logo');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editPopup = document.querySelector('#edit-profile-popup');
const addPopup = document.querySelector('#add-card-popup');
const imagePopup = document.querySelector('#image-preview-popup');
const deletePopup = document.querySelector('#delete-confirm-popup');
const avatarPopup = document.querySelector('#avatar-edit-popup');
const editFormElement = editPopup.querySelector('.popup__form');
const addFormElement = addPopup.querySelector('.popup__form');
const deleteFormElement = deletePopup.querySelector('.popup__form');
const avatarFormElement = avatarPopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('input[name="name"]');
const jobInput = editFormElement.querySelector('input[name="description"]');
const cardNameInput = addFormElement.querySelector('input[name="name"]');
const cardLinkInput = addFormElement.querySelector('input[name="link"]');
const avatarInput = avatarFormElement.querySelector('input[name="avatar"]');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId;

function openImagePopup(name, link) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function toggleLike(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  (isLiked ? unlikeCard(cardId) : likeCard(cardId))
    .then((cardData) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = cardData.likes.length;
    })
    .catch((err) => console.log(err));
}

function handleDeleteCard(cardElement, cardId) {
  openModal(deletePopup);
  deleteFormElement.onsubmit = (evt) => {
    evt.preventDefault();
    deleteCardFromServer(cardId)
      .then(() => {
        deleteCard(cardElement);
        closeModal(deletePopup);
      })
      .catch((err) => console.log(err));
  };
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = editFormElement.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  updateUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => submitButton.textContent = 'Сохранить');
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = addFormElement.querySelector('.popup__button');
  if (submitButton.disabled) return;
  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение...';
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCard = createCard(cardData.name, cardData.link, handleDeleteCard, toggleLike, openImagePopup, cardData, userId);
      placesList.prepend(newCard);
      closeModal(addPopup);
      addFormElement.reset();
      clearValidation(addFormElement, validationConfig);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Создать';
      submitButton.disabled = false;
    });
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImageElement.style.backgroundImage = `url(${userData.avatar})`;
    logoElement.src = logoImage;

    cardsData.forEach((cardData) => {
      const card = createCard(cardData.name, cardData.link, handleDeleteCard, toggleLike, openImagePopup, cardData, userId);
      placesList.append(card);
    });
  })
  .catch((err) => console.log(err));

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editFormElement, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  clearValidation(addFormElement, validationConfig);
  openModal(addPopup);
});

avatarEditButton.addEventListener('click', () => {
  clearValidation(avatarFormElement, validationConfig);
  openModal(avatarPopup);
});

editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
deleteFormElement.addEventListener('submit', (evt) => evt.preventDefault());

avatarFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = avatarFormElement.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileImageElement.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
      avatarFormElement.reset();
      clearValidation(avatarFormElement, validationConfig);
    })
    .catch((err) => console.log(err))
    .finally(() => submitButton.textContent = 'Сохранить');
});

setCloseListeners(editPopup);
setCloseListeners(addPopup);
setCloseListeners(imagePopup);
setCloseListeners(deletePopup);
setCloseListeners(avatarPopup);

enableValidation(validationConfig);