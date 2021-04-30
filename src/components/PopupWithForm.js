import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup');
    this._button = this._popup.querySelector('button[type="submit"]');
    this._buttonDefaultText = this._button.textContent;
    this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const cardData = this._getInputValues();
      this._handleFormSubmit(cardData);
      this.close();
    });
  }

  renderLoading(isSending) {
    this._button.textContent = isSending ? 'Загрузка...' : this._buttonDefaultText;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  close() {
    super.close()
    this._popupForm.reset();
  }

}
