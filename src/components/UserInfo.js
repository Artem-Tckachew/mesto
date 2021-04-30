export default class UserInfo {
  constructor({ profileTitle, profileSubTitle, profileAvatar }) {
    this._profileTitle = profileTitle;
    this._profileSubTitle = profileSubTitle;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const itemUser = {
      profileTitle: this._profileTitle.textContent,
      profileSubTitle: this._profileSubTitle.textContent,
      profileAvatar: this._profileAvatar.style.backgroundImage
    };
    return itemUser;
  }

  setUserInfo({profileTitle, profileSubTitle, profileAvatar}) {
   if (profileTitle) this._profileTitle.textContent = profileTitle;
   if (profileSubTitle) this._profileSubTitle.textContent = profileSubTitle;
   if (profileAvatar) this._profileAvatar.style.backgroundImage = `url(${profileAvatar})`;
  }
}



