/// TODO: Do Actual data access code.
const HOST_NAME = "localhost";
const PORT = 5000;
export class DataAccess {
  static baseURL = `http://${HOST_NAME}:${PORT}`;
  async getCyphers() {
    throw new Error("Not Implemented Error");
  }
  async encryptMessage(message, url, key = null) {
    throw new Error("Not Implemented Error");
  }

  async decryptMessage(message, url, key = null) {
    throw new Error("Not Implemented Error");
  }
}
