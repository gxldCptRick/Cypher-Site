import React from "react";
import "./Cypher.css";

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
const defaultEncryptMessage = "type here to encrypt";
const defaultDecryptMessage = "type here to decrypt";
export class CypherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encryptMessage: "",
      decryptMessage: "",
      key: "",
      isLoading: false
    };
    this.cypher = props.data;
  }

  keyChanged = e => {
    this.setState({ key: e.target.value });
  };

  decryptChanged = e => {
    this.setState({
      decryptMessage: e.target.value
    });
  };

  encryptChanged = e => {
    this.setState({
      encryptMessage: e.target.value
    });
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
        this.setState({ isLoading: true });
        let altered_message = await this.props[propFunction](
          this.state[message],
          this.state.key
        );
        let obj = {};
        obj[destination] = altered_message;
        this.setState(Object.assign(obj, { isLoading: false }));
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
        <div className="flex">
          <div className="text-input">
            <h2>Decrypt Box</h2>
            <textarea
              placeholder={defaultDecryptMessage}
              disabled={this.state.isLoading}
              onChange={this.decryptChanged}
              value={this.state.decryptMessage}
            />
            <button
              disabled={this.state.isLoading}
              onClick={this.generateCallback(
                "onDecrypt",
                "decryptMessage",
                "encryptMessage"
              )}
            >
              Decrypt
            </button>
          </div>
          <div className="text-input">
            <h2>Encrypt Box</h2>
            <textarea
              placeholder={defaultEncryptMessage}
              disabled={this.state.isLoading}
              onChange={this.encryptChanged}
              value={this.state.encryptMessage}
            />
            <button
              disabled={this.state.isLoading}
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
      </div>
    );
  }
}
