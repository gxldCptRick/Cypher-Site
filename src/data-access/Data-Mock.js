export class DataAccess {
  expensiveOp() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
  async getCyphers() {
    let cyphers = [];
    try {
      await this.expensiveOp();
      let string =
        '{ "data": [ { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "none", "name": "Reverse Cypher", "url": "http://localhost:5000/Reverse Cypher/" }, { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "number", "name": "Caesars Cypher", "url": "http://localhost:5000/Caesars Cypher/" }, { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "number", "name": "Transposition cypher", "url": "http://localhost:5000/Transposition cypher/" }, { "description": "This is a cypher developed by lord bacon that uses captilization as a means to encode the message.", "example": "TODO: write an example", "keyType": "none", "name": "Bacons Cypher", "url": "http://localhost:5000/Bacons Cypher/" }, { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "text", "name": "Word Transposition Cypher", "url": "http://localhost:5000/Word Transposition Cypher/" }, { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "number", "name": "Multiplication Cypher", "url": "http://localhost:5000/Multiplication Cypher/" }, { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "number", "name": "Alphine Cypher", "url": "http://localhost:5000/Alphine Cypher/" }, { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "text", "name": "Vigen\u00e9re Cypher", "url": "http://localhost:5000/Vigen\u00e9re Cypher/" }, { "description": "TODO: ADD DESCRIPTION", "example": "TODO: ADD EXAMPLE", "keyType": "text", "name": "Caesar Word", "url": "http://localhost:5000/Caesar Word/" } ], "successful": "true"}';
      cyphers = JSON.parse(string);
    } catch (e) {
      console.log(e);
      cyphers = e;
    }
    console.log(cyphers);
    return cyphers.data;
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
