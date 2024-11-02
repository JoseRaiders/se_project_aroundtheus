// manages profile info
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    // info about the user
    return {
      title: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    // add new user data
    this._nameElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}
