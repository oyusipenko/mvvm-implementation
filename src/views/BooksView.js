import React from "react";

const BooksView = ({ books, isLoading, error, onAddBook }) => {

  return (
    <div>
      {isLoading && <div>Loading books...</div>}

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!isLoading && !error && books.length === 0 && (
        <div>No books available</div>
      )}

      {books.map((book, i) => (
        <div key={i}>
          {book.author}: {book.name}
        </div>
      ))}

      <button onClick={onAddBook} disabled={isLoading}>
        Add Book
      </button>
    </div>
  );
};

export default BooksView;