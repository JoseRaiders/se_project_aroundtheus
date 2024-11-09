// manages profile info
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // info about the user
    return {
      title: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ title, description, avatar }) {
    // add new user data
    this._nameElement.textContent = title;
    this._descriptionElement.textContent = description;
    this._avatarElement.src = avatar;
  }
}
