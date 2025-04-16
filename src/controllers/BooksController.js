import booksRepository from "../repositories/BooksRepository";

class BooksController {
  constructor() {
    this.booksRepository = booksRepository;
    this.books = [];
    this.setBooks = null;
  }

  initialize = (setBooks) => {
    this.setBooks = setBooks;
    this.loadBooks();
  }

  loadBooks = async () => {
    try {
      const books = await this.booksRepository.getBooks();
      this.books = books;
      if (this.setBooks) {
        this.setBooks([...books]);
      }
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  handleAddBook = () => {
    // TBD - Will be implemented in the next step
  };
}

export default new BooksController();