function showInputError(inputElement, errorMessage, settings) {
  const errorElement = inputElement.closest('form').querySelector(`#${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
}

function hideInputError(inputElement, settings) {
  const errorElement = inputElement.closest('form').querySelector(`#${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
  }
}

function checkInputValidity(inputElement, settings) {
  if (inputElement.validity.valueMissing) {
    showInputError(inputElement, inputElement.validationMessage, settings);
  } else if (inputElement.validity.tooShort) {
    showInputError(inputElement, inputElement.validationMessage, settings);
  } else if (inputElement.validity.patternMismatch) {
    showInputError(inputElement, inputElement.dataset.patternError || 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы', settings);
  } else if (inputElement.validity.typeMismatch) {
    showInputError(inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });

  toggleButtonState(inputList, buttonElement, settings);
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

export function clearValidation(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(inputElement, settings);
  });
  toggleButtonState(inputList, buttonElement, settings);
}