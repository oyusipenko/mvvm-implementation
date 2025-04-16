import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

import "./styles.css";
import booksController from "./controllers/BooksController";
import BooksView from "./views/BooksView";
import booksStore from "./stores/BooksStore";
import application from "./core/Application";

application.initialize();

function App() {
  return <BooksView
    books={booksStore.books}
    isLoading={booksStore.isLoading}
    error={booksStore.error}
    onAddBook={booksController.handleAddBook}
  />;
}

const ObservedApp = observer(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<ObservedApp />, rootElement);
