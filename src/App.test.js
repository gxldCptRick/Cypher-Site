import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataAccess } from "./data-access/Data-Mock";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App service={new DataAccess()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
