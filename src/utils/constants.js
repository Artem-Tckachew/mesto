const openButton = document.querySelector('.profile__edit');
const profileOverlay = '.overlay_profile';
const overlayAddCard = '.overlay_addcard';
const overlayImg = '.overlay_img';
const overlayAvatar = '.overlay_avatar';
const overlaySubmit = '.overlay_submit'
const cardDelete = document.querySelectorAll('.element__remove');
const profileButtonOpen = document.querySelector('.profile__add');
const profileName = document.querySelector('.form__input_name');
const profileJob = document.querySelector('.form__input_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const popupProfile = document.querySelector('.popup_profile');
const cardAdd = document.querySelector('.popup_add');
const popupImg = document.querySelector('.popup__img');
const popupAvatar = document.querySelector('.popup_avatar')
const popupImgDescription = document.querySelector('.popup__imgcapiton');
const elements = '.elements';

const options = {
  address: 'https://mesto.nomoreparties.co/v1',
  groupId: `cohort-21`,
  token: `8175abd9-b645-43b7-84ff-ba3f9c9c5324`,
}

const configValidation = {
  formSelector: '.popup_form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export { openButton, profileOverlay,
   overlayAddCard, overlayImg, profileButtonOpen, profileName, profileJob, profileTitle,
   profileSubTitle, popupProfile, cardAdd, popupImg,popupImgDescription, profileAvatar,
   elements, options, configValidation, overlayAvatar, popupAvatar, overlaySubmit, cardDelete }
