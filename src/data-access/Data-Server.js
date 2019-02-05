/// TODO: Do Actual data access code.
const HOST_NAME = "localhost";
const PORT = 5000;
const baseURL = `http://${HOST_NAME}:${PORT}`;
export class DataAccess {
  constructor() {
    this.cypherDecrypt = {};
    this.cypherEncrypt = {};
  }

  async makeGetRequest(url) {
    let response = await fetch(url);
    let bodyJSON = await response.json();
    let responseData = JSON.parse(bodyJSON);
    return responseData;
  }
  async getCyphers() {
    if (!this.cyphers) {
      let cypherRequest = await this.makeGetRequest(baseURL);
      this.cyphers = cypherRequest.data;
    }
    return this.cyphers;
  }
  async encryptMessage(message, url, key = null) {
    if (!this.cypherEncrypt[url]) {
      let cypherObj = await this.makeGetRequest(url);
      this.cypherEncrypt[url] = cypherObj.encryptUrl;
      this.cypherDecrypt[url] = cypherObj.decryptUl;
    }
    let response = await this.makeGetRequest(
      `${this.cypherEncrypt[url]}/${message}/${key}`
    );
    return response.message;
  }

  async decryptMessage(message, url, key = null) {
    if (!this.cypherDecrypt[url]) {
      let cypherObj = await this.makeGetRequest(url);
      this.cypherEncrypt[url] = cypherObj.encryptUrl;
      this.cypherDecrypt[url] = cypherObj.decryptUrl;
    }
    let response = await this.makeGetRequest(
      `${this.cypherDecrypt[url]}/${message}/${key}`
    );
    return response.message;
  }
}
