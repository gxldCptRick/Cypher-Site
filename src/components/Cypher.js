import React from "react";
function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}
export function CypherDisplay(props) {
  if (!props.data) throw new Error("props must contain data object");
  const cypher = props.data;
  return (
    <div className="cypher">
      <h2>{cypher.name}</h2>
      <p>Key: {capitalizeString(cypher.keyType)}</p>
      <p>{cypher.description}</p>
    </div>
  );
}

export class CypherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encryptMessage: "",
      decryptMessage: "",
      key: ""
    };
    this.cypher = props.data;
  }

  keyChanged = e => {
    this.setState({ key: e.target.value });
  };

  decryptChanged = e => {
    this.setState({ decryptMessage: e.target.value });
  };

  encryptChanged = e => {
    this.setState({ encryptMessage: e.target.value });
  };

  renderKey() {
    if (this.cypher.keyType !== "none") {
      return (
        <div>
          <h2>The Key Must Be A {this.cypher.keyType}</h2>
          <input
            value={this.state.key}
            onChange={this.keyChanged}
            type={this.cypher.keyType}
            name="key"
          />
        </div>
      );
    }
  }
  generateCallback(propFunction, message, destination) {
    return async () => {
      try {
        let altered_message = await this.props[propFunction](
          this.state[message],
          this.state.key
        );
        let obj = {};
        obj[destination] = altered_message;
        this.setState(obj);
      } catch (e) {
        alert(e);
      }
    };
  }

  render() {
    const cypher = this.props.data;
    return (
      <div>
        {this.renderKey()}
        <h2>{cypher.name}</h2>
        <p>{cypher.description}</p>
        <p>{cypher.example}</p>
        <div>
          <div>
            <h2>Decrypt Box</h2>
            <textarea
              onChange={this.decryptChanged}
              value={this.state.decryptMessage}
            />
          </div>
          <div>
            <h2>Encrypt Box</h2>
            <textarea
              onChange={this.encryptChanged}
              value={this.state.encryptMessage}
            />
          </div>
          <button
            onClick={this.generateCallback(
              "onDecrypt",
              "decryptMessage",
              "encryptMessage"
            )}
          >
            Decrypt
          </button>
          <button
            onClick={this.generateCallback(
              "onEncrypt",
              "encryptMessage",
              "decryptMessage"
            )}
          >
            Encrypt
          </button>
        </div>
      </div>
    );
  }
}
