export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  setUserInfo({ name, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: this._headers.authorization,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  // log the error to the console
  _handleError(err) {
    console.error("API error:", err);
    throw err;
  }
}
