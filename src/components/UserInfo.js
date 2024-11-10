// manages profile info
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    if (avatarSelector) {
      this._avatarElement = document.querySelector(avatarSelector);
    }
  }

  getUserInfo() {
    // info about the user
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
      // avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    // add new user data
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }
}
