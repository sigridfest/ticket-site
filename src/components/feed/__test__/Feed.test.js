import React from "react";
import ReactDOM from "react-dom";
import Feed from "./../Feed";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Feed></Feed>, div);
});
