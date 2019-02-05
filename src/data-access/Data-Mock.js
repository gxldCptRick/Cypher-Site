export class DataAccess {
  expensiveOp() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
  async getCyphers() {
    let cyphers = [];
    try {
      await this.expensiveOp();
      cyphers = [
        {
          name: "Cypher Name",
          keyType: "number",
          description: "This is the most legit thing ever yeah",
          example: "What The Fuck No",
          url: "/"
        },
        {
          name: "Other Cypher",
          keyType: "none",
          description: "This is just some trash cypher not worth",
          example: "Yeet Yeet",
          url: "/"
        },
        {
          name: "The Best Cypher",
          keyType: "text",
          description:
            "What how did you find this sacred cypher of the gods....",
          example: "Why You Laughing HUH",
          url: "/"
        }
      ];
    } catch (e) {
      cyphers = e;
    }
    return cyphers;
  }
  async encryptMessage(message, url, key = null) {
    await this.expensiveOp();
    return '"I Got You" - jon';
  }

  async decryptMessage(message, url, key = null) {
    await this.expensiveOp();
    return '"This is gonna work" - Andres';
  }
}
