const HOST_NAME = "localhost";
const PORT = 5000;
const baseURL = `http://${HOST_NAME}:${PORT}`;

function capitalize(word) {
  return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
}

export class DataAccess {
  constructor() {
    this.cypherDecrypt = {};
    this.cypherEncrypt = {};
    this.cypherObj = {};
  }

  async makeGetRequest(url) {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {},
      redirect: "follow",
      referrer: "no-referrer"
    });
    let bodyJSON = await response.json();
    let responseData = JSON.parse(bodyJSON);
    if (!responseData.succesful) throw new Error("Request was not successful");
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
    return await response.json();
  }
  async getCyphers() {
    if (!this.cyphers) {
      this.cyphers = await this.makeGetRequest(baseURL);
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
  }

  // type is either encrypt or decrypt
  async proccessMessageRequest(type, message, url, key) {
    if (!this["cypher" + capitalize(type)][url]) {
      await this.requestDecryptAndEncryptUrl(url);
    }
    let requestTypeObj = this[type + "Info"][url];
    let response = {};
    if (message.length <= 50) {
      let methodUrl = requestTypeObj[type + "Url"];
      methodUrl = methodUrl
        .replace(requestTypeObj.messageTemplate, message)
        .replace(requestTypeObj.keyTemplate, key);
      response = await this.makeGetRequest(methodUrl);
    } else {
      let methodUrl = this.cypherObj[url][type + "Url"];
      response = await this.makePostRequest(methodUrl, { message, key });
    }
    return response;
  }

  async encryptMessage(message, url, key = null) {
    this.proccessMessageRequest("encrypt", message, url, key);
  }

  async decryptMessage(message, url, key = null) {
    this.proccessMessageRequest("decrypt", message, url, key);
  }
}
