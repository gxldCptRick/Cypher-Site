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

  async requestDecryptAndEncryptUrl(url) {
    let cypherObj = await this.makeGetRequest(url);
    let decryptObj = await this.makeGetRequest(cypherObj.decryptUrl);
    let encryptObj = await this.makeGetRequest(cypherObj.encryptUrl);
    this.encryptInfo[url] = encryptObj;
    this.decryptInfo[url] = decryptObj;
  }

  async encryptMessage(message, url, key = null) {
    if (!this.cypherEncrypt[url]) {
      await this.requestDecryptAndEncryptUrl(url);
    }
    let encryptObj = this.encryptInfo[url];
    let encryptUrl = encryptObj.encryptUrl;
    encryptUrl = encryptUrl
      .replace(encryptObj.messageTemplate, message)
      .replace(encryptObj.keyTemplate, key);
    let response = await this.makeGetRequest(encryptUrl);
    return response.message;
  }

  async decryptMessage(message, url, key = null) {
    if (!this.cypherDecrypt[url]) {
      await this.requestDecryptAndEncryptUrl(url);
    }
    let decryptObj = this.decryptInfo[url];
    let decryptUrl = decryptObj.encryptUrl;
    decryptUrl = decryptUrl
      .replace(decryptObj.messageTemplate, message)
      .replace(decryptObj.keyTemplate, key);
    let response = await this.makeGetRequest(decryptUrl);
    return response.message;
  }
}
