import React from "react";

const BooksView = ({ books, onAddBook }) => (
  <div>
    {books.map((book, i) => (
      <div key={i}>
        {book.author}: {book.name}
      </div>
    ))}
    <button onClick={onAddBook}>Add</button>
  </div>
);

export default BooksView;