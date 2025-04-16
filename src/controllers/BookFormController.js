import { runInAction } from "mobx";
import booksStore from "../stores/BooksStore";
import booksRepository from "../repositories/BooksRepository";
import Book from "../models/Book";
import booksController from "./BooksController";
import { v4 as uuid } from 'uuid';

class BookFormController {
  constructor() {
    this.booksStore = booksStore;
    this.booksRepository = booksRepository;
    this.booksController = booksController;
  }

  toggleVisibility = () => {
    runInAction(() => {
      this.booksStore.showBookForm = !this.booksStore.showBookForm;
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookData = new Book(
      uuid(),
      formData.get('name'),
      formData.get('author')
    )

    this.createBook(bookData);
  };

  createBook = async (bookData) => {
    try {
      runInAction(() => {
        this.booksStore.setSubmitting(true);
        this.booksStore.setSubmissionError(null);
      });

      const result = await this.booksRepository.addBook(bookData);

      if (result) {
        runInAction(() => {
          this.booksStore.setSubmitting(false);
          this.booksStore.showBookForm = false;
        });

        await this.booksController.loadBooks();
      } else {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      runInAction(() => {
        this.booksStore.setSubmissionError(error.message);
        this.booksStore.setSubmitting(false);
      });
    }
  };
}

export default new BookFormController();