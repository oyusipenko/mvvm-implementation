import booksStore from '../BooksStore';

describe('BooksStore', () => {
  beforeEach(() => {
    booksStore.books = [];
    booksStore.isLoading = false;
    booksStore.error = null;
    booksStore.submissionError = null;
    booksStore.isSubmitting = false;
    booksStore.showBookForm = false;
  });

  it('stores books correctly', () => {
    const books = [{ id: '1', name: 'Book', author: 'Author' }];
    booksStore.setBooks(books);
    expect(booksStore.books).toEqual(books);
  });

  it('handles loading state', () => {
    expect(booksStore.isLoading).toBe(false);

    booksStore.setLoading(true);
    expect(booksStore.isLoading).toBe(true);

    booksStore.setLoading(false);
    expect(booksStore.isLoading).toBe(false);
  });

  it('sets and clears error messages', () => {
    booksStore.setError('Error message');
    expect(booksStore.error).toBe('Error message');

    booksStore.setError(null);
    expect(booksStore.error).toBeNull();
  });

  it('handles submission state', () => {
    booksStore.setSubmitting(true);
    expect(booksStore.isSubmitting).toBe(true);

    booksStore.setSubmitting(false);
    expect(booksStore.isSubmitting).toBe(false);
  });

  it('sets and clears submission errors', () => {
    booksStore.setSubmissionError('Submission failed');
    expect(booksStore.submissionError).toBe('Submission failed');

    booksStore.setSubmissionError(null);
    expect(booksStore.submissionError).toBeNull();
  });

  it('toggles book form visibility', () => {
    expect(booksStore.showBookForm).toBe(false);

    booksStore.showBookForm = true;
    expect(booksStore.showBookForm).toBe(true);

    booksStore.showBookForm = false;
    expect(booksStore.showBookForm).toBe(false);
  });
});