import './index.css'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import {
  openButton, profileOverlay,
  overlayAddCard, overlayImg, profileButtonOpen, profileName, profileJob, profileTitle,
  profileSubTitle, popupProfile, cardAdd, popupImg, popupImgDescription, profileAvatar,
  elements, options, configValidation, overlayAvatar, popupAvatar, overlaySubmit
} from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

let userId = null;

function createCard(cardData) {
  const card = new Card({
    data: {
      owner: cardData.owner,
      name: cardData.name,
      link: cardData.link,
      likes: cardData.likes,
      id: cardData._id,
      currentUserId: userId
    },

    handleCardClick: (name, link) => {
      img.open(name, link);
    },
    handleLikeClick: (card) => {
      api.changeLike(card.id(), !card.isLiked())
        .then(data => {
          card.setLikesInfo(data);
        })
        .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
    },
    handleDeleteIconClick: (card) => {
      popupSubmitDelete.setSubmitAction(() => {
        popupSubmitDelete.renderLoading(true);
        api.deleteCard(card.id())
          .then(() => {
            card.deleteCard();
            popupSubmitDelete.close();
          })
          .catch(err => console.log(`При удалении карточки: ${err}`))
          .finally(() => popupSubmitDelete.renderLoading(false));
      });
      popupSubmitDelete.open();
    },
  }, '.element__template');
  const cardElement = card.generateCard();
  return cardElement;
}

const api = new Api(options);
const userInfoData = new UserInfo({ profileTitle, profileSubTitle, profileAvatar });
const img = new PopupWithImage(overlayImg, popupImgDescription, popupImg);

const profilePopup = new PopupWithForm(profileOverlay, {
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true);
    api.getUserTitle({
      name: data.profileTitle,
      about: data.profileSubTitle
    })
      .then((info) => {
        userInfoData.setUserInfo({
          profileTitle: info.name,
          profileSubTitle: info.about,
        });
        debugger
        profilePopup.close();
      })
      .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
      .finally(() => profilePopup.renderLoading(false));
  }
})

openButton.addEventListener('click', (event) => {
  event.preventDefault();
  const userInfoItem = userInfoData.getUserInfo()
  profileName.value = userInfoItem.profileTitle
  profileJob.value = userInfoItem.profileSubTitle
  profilePopup.open();
});
profilePopup.setEventListeners();

img.setEventListeners();

const defaultCardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item)
    defaultCardList.addItem(cardElement);
  }
}, elements);

const validatorAddCard = new FormValidator(configValidation, cardAdd);
validatorAddCard.enableValidation();

const validatorProfile = new FormValidator(configValidation, popupProfile);
validatorProfile.enableValidation();

const validatorAvatar = new FormValidator(configValidation, popupAvatar);
validatorAvatar.enableValidation();

const addCard = new PopupWithForm(overlayAddCard, {
  handleFormSubmit: (cardData) => {
    addCard.renderLoading(true);

    api.createTask(cardData)
      .then((data) => {
        const cardElement = createCard(data)
        defaultCardList.prependItem(cardElement);
        addCard.close();
      })
      .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
      .finally(() => addCard.renderLoading(false));
  }
});

const editAvatar = new PopupWithForm(overlayAvatar, {
  handleFormSubmit: (data) => {
    editAvatar.renderLoading(true);
    api.getUserAvatar({avatar: data.profileAvatar})
      .then((info) => {
        userInfoData.setUserInfo({profileAvatar: info.avatar});
        editAvatar.close();
      })
      .catch(err => console.log(`Ошибка изменения аватара пользователя: ${err}`))
      .finally(() => editAvatar.renderLoading(false));
  }
});

const popupSubmitDelete = new PopupWithForm(overlaySubmit, {
  handleFormSubmit: () => { }
})

popupSubmitDelete.setEventListeners();

profileAvatar.addEventListener('click', () => {
  editAvatar.open();
})
editAvatar.setEventListeners();

profileButtonOpen.addEventListener('click', () => {
  addCard.open();
});
addCard.setEventListeners();

Promise.all([api.getInitialCards(), api.userTitle()])
  .then(([cards, userData]) => {
    userId = userData._id;

    userInfoData.setUserInfo({
      profileTitle: userData.name,
      profileSubTitle: userData.about,
      profileAvatar: userData.avatar
    });

    defaultCardList.renderItems(cards);
  })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`))
