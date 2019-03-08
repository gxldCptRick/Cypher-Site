const HOST_NAME = "localhost";
const PORT = 5000;
const baseURL = `http://${HOST_NAME}:${PORT}`;

// function capitalize(word) {
//   return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
// }

export class DataAccess {
  constructor() {
    this.decryptObj = {};
    this.encryptObj = {};
    this.cypherObj = {};
    this.decryptInfo = {};
    this.encryptInfo = {};
  }

  async makeGetRequest(url) {
    let response = await fetch(url, {
      method: "GET",
      cache: "no-cache"
    });
    try {
      var responseData = await response.json();
    } catch (e) {
      console.log(e);
      throw e;
    }
    if (!responseData.successful) throw new Error("Request was not successful");
    return responseData.data;
  }

  async makePostRequest(url, data) {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    });
    let obj = await response.json();
    if (!obj.successful) throw new Error("Request Was not successful");
    return obj.data;
  }
  async getCyphers() {
    if (!this.cyphers) {
      try {
        this.cyphers = await this.makeGetRequest(baseURL);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    return this.cyphers;
  }

  async requestDecryptAndEncryptUrl(url) {
    let cypherObj = await this.makeGetRequest(url);
    this.cypherObj[url] = cypherObj;
    let decryptObj = await this.makeGetRequest(cypherObj.decryptUrl);
    let encryptObj = await this.makeGetRequest(cypherObj.encryptUrl);
    this.encryptInfo[url] = encryptObj;
    this.decryptInfo[url] = decryptObj;
    return;
  }

  // type is either encrypt or decrypt
  async proccessMessageRequest(type, message, url, key = "none") {
    if (this[type + "Obj"] && !this[type + "Obj"][url]) {
      console.log("initialCreate");
      await this.requestDecryptAndEncryptUrl(url);
    }
    let requestTypeObj = this[type + "Info"][url];
    let response = {};
    if (message.length <= 50) {
      let methodUrl = requestTypeObj[type + "Url"];
      console.log(methodUrl);
      methodUrl = methodUrl
        .replace(requestTypeObj.messageTemplate, message)
        .replace(requestTypeObj.keyTemplate, key);
      console.log(methodUrl);
      response = await this.makeGetRequest(methodUrl);
    } else {
      let methodUrl = this.cypherObj[url][type + "Url"];
      response = await this.makePostRequest(methodUrl, { message, key });
    }
    return response;
  }

  async encryptMessage(message, url, key = "none") {
    return this.proccessMessageRequest("encrypt", message, url, key);
  }

  async decryptMessage(message, url, key = "none") {
    return this.proccessMessageRequest("decrypt", message, url, key);
  }
}
