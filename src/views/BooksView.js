import React from "react";
import { observer } from "mobx-react";
import BookFormView from "./BookFormView";
import BooksListView from "./BooksListView";
import booksStore from "../stores/BooksStore";

const BooksView = () => {
  const { showBookForm } = booksStore;

  return (
    <div className="books-container">
      {showBookForm ? (
        <BookFormView />
      ) : (
        <BooksListView />
      )}
    </div>
  );
};

export default observer(BooksView);