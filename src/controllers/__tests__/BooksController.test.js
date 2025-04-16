import booksController from '../BooksController';
import booksStore from '../../stores/BooksStore';
import booksRepository from '../../repositories/BooksRepository';

jest.mock('../../stores/BooksStore', () => ({
  setBooks: jest.fn(),
  setLoading: jest.fn(),
  setError: jest.fn()
}));

jest.mock('../../repositories/BooksRepository', () => ({
  getBooks: jest.fn()
}));

jest.mock('../BookFormController', () => ({
  toggleVisibility: jest.fn()
}));

describe('BooksController', () => {
  const mockBooks = [
    { id: '1', name: 'War and Peace', author: 'Tolstoy L.' },
    { id: '2', name: 'Crime and Punishment', author: 'Dostoevsky F.' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadBooks', () => {
    test('should load books and update store', async () => {
      booksRepository.getBooks.mockResolvedValue(mockBooks);

      await booksController.loadBooks();

      expect(booksRepository.getBooks).toHaveBeenCalled();
      expect(booksStore.setLoading).toHaveBeenCalledWith(true);
      expect(booksStore.setBooks).toHaveBeenCalledWith(mockBooks);
      expect(booksStore.setLoading).toHaveBeenCalledWith(false);
    });

    test('should handle errors when loading books', async () => {
      const error = new Error('API Error');
      booksRepository.getBooks.mockRejectedValue(error);

      await booksController.loadBooks();

      expect(booksStore.setError).toHaveBeenCalledWith(error.message);
      expect(booksStore.setLoading).toHaveBeenCalledWith(false);
    });
  });
});