import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

import "./styles.css";
import BooksView from "./views/BooksView";

const App = observer(() => {
  return <BooksView />;
});

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
