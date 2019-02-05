import React, { Component } from "react";
import "./App.css";
import { CypherDisplay, CypherPage } from "./components/Cypher";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
function NotFound() {
  return <p>HI LOOKS LIKE YOU DIDN't FIND WHAT YOU WERE LOOKING FOR</p>;
}
function CypherPageCreator(cypher, callback) {
  return () => <CypherPage data={cypher} {...callback} />;
}

function MainPage(datto) {
  return () => (
    <div>
      <header>
        <h1>Avaliable Cyphers</h1>
      </header>
      <ul className="cyphers-list">
        {datto.map(e => (
          <li key={e.name}>
            <Link className="cypher-link" to={"/" + e.name}>
              <CypherDisplay data={e} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

  renderRoutingTable() {
    let routerDisplay = null;
    if (this.state.data.length > 0) {
      routerDisplay = (
        <BrowserRouter>
          <div>
            <nav className="cypher-nav">
              <Link to="/">
                <h2>Home</h2>
              </Link>
            </nav>
            <Switch>
              {this.state.data.map(e => (
                <Route
                  exact
                  path={"/" + e.name}
                  key={e.name}
                  component={CypherPageCreator(e, {
                    onDecrypt: (message, key) =>
                      this.service.decryptMessage(message, e.url, key),
                    onEncrypt: (message, key) =>
                      this.service.encryptMessage(message, e.url, key)
                  })}
                />
              ))}
              <Route exact path={"/"} component={MainPage(this.state.data)} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    } else {
      routerDisplay = <h2>Loading....</h2>;
    }
    return routerDisplay;
  }

  render() {
    return <div className="App"> {this.renderRoutingTable()}</div>;
  }
}

export default App;
