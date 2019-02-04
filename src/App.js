import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Cypher } from "./components/Cypher";

class App extends Component {
  constructor(props) {
    super(props);
    this.service = props.service;
    this.state = { data: [] };
  }
  async componentDidMount() {
    this.isVisible = true;
    try {
      const data = await this.service.getCyphers();
      if (this.isVisible) {
        this.setState({ data });
      }
    } catch (e) {
      if (this.isVisible) {
        this.setState({ error: e });
      }
    }
  }

  componentWillUnmount() {
    this.isVisible = false;
  }

  renderCyphers() {
    let cyphersDisplay = null;
    if (this.state.data.length > 0) {
      cyphersDisplay = this.state.data.map(e => (
        <Cypher key={e.name} data={e} />
      ));
    }
    return cyphersDisplay;
  }

  renderError() {
    let errorDisplay = null;
    if (this.state.error) {
      errorDisplay = <p>{this.state.error.toString()}</p>;
    }
    return errorDisplay;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {this.renderError()}
        <ul>{this.renderCyphers()}</ul>
      </div>
    );
  }
}

export default App;
