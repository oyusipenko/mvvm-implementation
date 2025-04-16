import { runInAction } from "mobx";
import booksStore from "../stores/BooksStore";
import booksRepository from "../repositories/BooksRepository";
import bookFormController from "./BookFormController";

class BooksController {
  constructor() {
    this.booksStore = booksStore;
    this.booksRepository = booksRepository;
    this.bookFormController = bookFormController;
    this.loadBooks();
  }

  loadBooks = async () => {
    try {
      runInAction(() => {
        this.booksStore.setLoading(true);
      });

      const books = await this.booksRepository.getBooks();

      runInAction(() => {
        this.booksStore.setBooks(books);
        this.booksStore.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.booksStore.setError(error.message);
        this.booksStore.setLoading(false);
      });
    }
  };
}

export default new BooksController();