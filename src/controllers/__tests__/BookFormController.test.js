import bookFormController from '../BookFormController';
import booksStore from '../../stores/BooksStore';
import booksRepository from '../../repositories/BooksRepository';
import Book from '../../models/Book';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

jest.mock('../../stores/BooksStore', () => ({
  setSubmitting: jest.fn(),
  setSubmissionError: jest.fn(),
  showBookForm: false
}));

jest.mock('../../repositories/BooksRepository', () => ({
  addBook: jest.fn()
}));

jest.mock('../BooksController', () => ({
  loadBooks: jest.fn()
}));

global.FormData = jest.fn().mockImplementation(() => ({
  get: jest.fn(key => {
    if (key === 'name') return 'Test Book';
    if (key === 'author') return 'Test Author';
    return null;
  })
}));

describe('BookFormController', () => {
  let mockBook;
  let mockEvent;
  const booksController = require('../BooksController');

  beforeEach(() => {
    jest.clearAllMocks();

    mockBook = new Book('test-uuid', 'Test Book', 'Test Author');
    mockEvent = {
      preventDefault: jest.fn(),
      target: {}
    };
  });

  describe('toggleVisibility', () => {
    test('should toggle form visibility', () => {
      let storeValue = false;
      Object.defineProperty(booksStore, 'showBookForm', {
        get: () => storeValue,
        set: (value) => { storeValue = value; }
      });

      bookFormController.toggleVisibility();

      expect(storeValue).toBe(true);
    });
  });

  describe('handleFormSubmit', () => {
    test('should extract form data and call createBook', () => {
      const createBookSpy = jest.spyOn(bookFormController, 'createBook')
        .mockImplementation(() => { });

      bookFormController.handleFormSubmit(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(createBookSpy).toHaveBeenCalledWith(expect.objectContaining({
        id: 'test-uuid',
        name: 'Test Book',
        author: 'Test Author'
      }));
    });
  });

  describe('createBook', () => {
    test('should successfully add a book', async () => {
      booksRepository.addBook.mockResolvedValue(true);

      await bookFormController.createBook(mockBook);

      expect(booksRepository.addBook).toHaveBeenCalledWith(mockBook);
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(true);
      expect(booksStore.setSubmissionError).toHaveBeenCalledWith(null);
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(false);
      expect(booksController.loadBooks).toHaveBeenCalled();
    });

    test('should handle errors', async () => {
      booksRepository.addBook.mockResolvedValue(false);

      await bookFormController.createBook(mockBook);

      expect(booksStore.setSubmissionError).toHaveBeenCalledWith('Failed to add book');
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(false);
    });

    test('should handle API exceptions', async () => {
      const error = new Error('Network error');
      booksRepository.addBook.mockRejectedValue(error);

      await bookFormController.createBook(mockBook);

      expect(booksStore.setSubmissionError).toHaveBeenCalledWith(error.message);
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(false);
    });
  });
});