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
    if (!responseData.succesful) throw new Error("Request was not successful");
    return responseData.data;
  }
  async getCyphers() {
    if (!this.cyphers) {
      this.cyphers = await this.makeGetRequest(baseURL);
    }
    return this.cyphers;
  }
  async encryptMessage(message, url, key = null) {
    if (!this.cypherEncrypt[url]) {
      let cypherObj = await this.makeGetRequest(url);
      this.cypherEncrypt[url] = cypherObj.encryptUrl;
      this.cypherDecrypt[url] = cypherObj.decryptUl;
    }
    let encryptUrl = this.encryptMessage[url];
    encryptUrl = encryptUrl.replace("<message>", message).replace("<key>", key);
    let response = await this.makeGetRequest(encryptUrl);
    return response.message;
  }

  async decryptMessage(message, url, key = null) {
    if (!this.cypherDecrypt[url]) {
      let cypherObj = await this.makeGetRequest(url);
      this.cypherEncrypt[url] = cypherObj.encryptUrl;
      this.cypherDecrypt[url] = cypherObj.decryptUrl;
    }
    let decryptUrl = this.cypherDecrypt[url];
    decryptUrl = decryptUrl.replace("<message>", message).replace("<key>", key);
    let response = await this.makeGetRequest(decryptUrl);
    return response.message;
  }
}
