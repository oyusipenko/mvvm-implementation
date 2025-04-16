import React, { useState } from "react";
import ReactDOM from "react-dom";
// import { observer } from "mobx-react";

import "./styles.css";
import booksController from "./controllers/BooksController";
import BooksView from "./views/BooksView";

function App() {
  const [books, setBooks] = useState([]);


  React.useEffect(() => {
    booksController.initialize(setBooks);
  }, []);

  return <BooksView
    books={books}
    onAddBook={booksController.handleAddBook}
  />;
}

const ObservedApp = App;

const rootElement = document.getElementById("root");
ReactDOM.render(<ObservedApp />, rootElement);
