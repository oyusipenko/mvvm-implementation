import { makeObservable, observable, action } from 'mobx';

class BooksStore {
  books = [];
  isLoading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      books: observable,
      isLoading: observable,
      error: observable,
      setBooks: action,
      setLoading: action,
      setError: action
    });
  }

  setBooks = (books) => {
    this.books = books;
  };

  setLoading = (loading) => {
    this.isLoading = loading;
  };

  setError = (error) => {
    this.error = error;
  };
}

const booksStore = new BooksStore();
export default booksStore;