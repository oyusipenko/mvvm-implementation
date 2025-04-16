import React from "react";
import { observer } from "mobx-react";
import booksStore from "../stores/BooksStore";
import bookFormController from "../controllers/BookFormController";

const BooksListView = () => {
  const { books, isLoading, error } = booksStore;

  return (
    <div className="books-list-container">
      <h2>Books List</h2>

      {isLoading && <div>Loading books...</div>}

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!isLoading && !error && books.length === 0 && (
        <div>No books available</div>
      )}

      {books.map((book, i) => (
        <div key={book.id || i} className="book-item">
          {book.author}: {book.name}
        </div>
      ))}

      <button
        onClick={bookFormController.toggleVisibility}
        disabled={isLoading}
        className="add-book-button"
      >
        Add Book
      </button>
    </div>
  );
};

export default observer(BooksListView);