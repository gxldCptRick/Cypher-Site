import React from "react";
import Link from "react-router-dom";
import CypherDisplay from "./Cypher";
import FilterWidget from "./Filter";
export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: () => true };
  }
  onFilterChange = filter => {
    if (!filter || typeof filter !== "function")
      throw new Error("filter must be a function.");
    this.setState({ filter });
  };

  render() {
    return (
      <div>
        <header>
          <h1>Avaliable Cyphers</h1>
        </header>
        <FilterWidget onFilterChange={this.onFilterChange} />
        <ul className="cyphers-list">
          {this.props.datto.filter(this.state.filter).map(e => (
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
}
