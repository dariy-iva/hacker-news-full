class Api {
  constructor(objConfig) {
    this._url = objConfig.url;
  }

  _verifyResolve(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getNewsList() {
    return fetch(`${this._url}/news`)
      .then(this._verifyResolve);
  }
  getCommentsList(parentId) {
    return fetch(`${this._url}/comments/${parentId}`)
      .then(this._verifyResolve);
  }
}

const apiConfig = {
  url: "http://localhost:8080",
};

export const api = new Api(apiConfig);