export class DataAccess {
  async getCyphers() {
    return [
      {
        name: "Cypher Name",
        keyType: "number",
        description: "This is the most legit thing ever yeah",
        url: "/"
      },
      {
        name: "Other Cypher",
        keyType: "none",
        description: "This is just some trash cypher not worth",
        url: "/"
      },
      {
        name: "The Best Cypher",
        keyType: "string",
        description: "What how did you find this sacred cypher of the gods....",
        url: "/"
      }
    ];
  }
  async encryptMessage(message, url, key = null) {
    return '"I Got You" - jon';
  }

  async decryptMessage(message, url, key = null) {
    return '"This is gonna work" - Andres';
  }
}
