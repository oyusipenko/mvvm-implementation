import { makeObservable, observable, action } from 'mobx';

class BooksStore {
  books = [];
  isLoading = false;
  error = null;
  isSubmitting = false;
  submissionError = null;
  showBookForm = false;

  constructor() {
    makeObservable(this, {
      books: observable,
      isLoading: observable,
      error: observable,
      isSubmitting: observable,
      submissionError: observable,
      showBookForm: observable,
      setBooks: action,
      setLoading: action,
      setError: action,
      setSubmitting: action,
      setSubmissionError: action,
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

  setSubmitting = (submitting) => {
    this.isSubmitting = submitting;
  };

  setSubmissionError = (error) => {
    this.submissionError = error;
  };
}

const booksStore = new BooksStore();
export default booksStore;