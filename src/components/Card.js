export default class Card {
  constructor({ data, handleDeleteIconClick, handleLikeClick, handleCardClick }, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick,
    this._handleCardClick = handleCardClick;
    this._userId = data.currentUserId;
    this._ownerId = data.owner._id;
    this._id = data.id;
  }

  _getTemplate() {
    const elementTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return elementTemplate;
  }

  _updateLikes() {
    this._element.querySelector('.element__like_count').textContent = this._likes.length;
    if (this.isLiked()) this._element.querySelector('.element__like')
      .classList.add('element__like_active');
    else this._element.querySelector('.element__like')
      .classList.remove('element__like_active');
  }

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._userId));
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._updateLikes();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._updateLikes();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__remove').
      classList.add(this._userId === this._ownerId ? 'element__remove_active' : 'element__remove_innactive');
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick(this)
    });

    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._handleDeleteIconClick(this)
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  id() {
    return this._id;
  }

  deleteCard() {
    this._element.remove();

    this._element = null;
  }

}
