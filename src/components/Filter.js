import React from "react";
import "./Filter.css";
const keyTypes = ["number", "text", "none"];
export class FilterWidget extends React.Component {
  constructor(props) {
    super(props);
    let state = {};
    keyTypes.forEach(e => (state[e] = false));
    this.state = state;
  }
  onChecked(name) {
    return () => {
      let newState = {};
      this.setState(oldState => {
        newState[name] = !oldState[name];
        newState = { ...oldState, ...newState };
        this.updateFilter(newState);
        return newState;
      });
    };
  }
  updateFilter(state) {
    if (
      keyTypes.some(e => {
        console.log(e, state[e]);
        return state[e];
      })
    ) {
      this.props.onFilterChange(obj =>
        keyTypes.filter(e => state[e]).includes(obj.keyType)
      );
    } else {
      this.props.onFilterChange(() => true);
    }
  }
  render() {
    return (
      <div>
        <h2>Key Types</h2>
        <form className="flex filter">
          {keyTypes.map((e, i) => (
            <div className="types" key={i}>
              <input
                type="checkbox"
                onChange={this.onChecked(e)}
                name={e}
                id={e}
              />
              <label htmlFor={e}>{e}</label>
            </div>
          ))}
        </form>
      </div>
    );
  }
}
