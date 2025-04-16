import booksStore from "../stores/BooksStore";
import booksRepository from "../repositories/BooksRepository";

class BooksController {
  constructor() {
    this.booksStore = booksStore;
    this.booksRepository = booksRepository;
  }

  initialize = () => {
    this.loadBooks();
  };

  loadBooks = async () => {
    try {
      this.booksStore.setLoading(true);

      const books = await this.booksRepository.getBooks();
      this.booksStore.setBooks(books);

      this.booksStore.setLoading(false);
    } catch (error) {
      this.booksStore.setError(error.message);
      this.booksStore.setLoading(false);
    }
  };

  handleAddBook = async () => {
    // TBD
  };
}

export default new BooksController();