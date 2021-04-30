import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector, title, url) {
    super(popupSelector);
    this._title = title;
    this._url = url;
  }

  open(name, link) {
    this._title.textContent = name;
    this._url.src = link;
    super.open();
  }
}
