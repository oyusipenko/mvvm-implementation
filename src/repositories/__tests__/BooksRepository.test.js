import booksRepository from '../BooksRepository';

jest.mock('../../services/ApiGateway', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    post: jest.fn()
  }));
});

describe('BooksRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets books from API', async () => {
    const books = [{ id: '1', name: 'Book 1', author: 'Author 1' }];
    booksRepository.httpGateway.get.mockResolvedValue(books);

    const result = await booksRepository.getBooks();

    expect(booksRepository.httpGateway.get).toHaveBeenCalledWith('/');
    expect(result).toEqual(books);
  });

  it('handles API errors in getBooks', async () => {
    booksRepository.httpGateway.get.mockRejectedValue(new Error('Failed'));
    await expect(booksRepository.getBooks()).rejects.toThrow();
  });

  it('adds book and returns true when successful', async () => {
    const book = { name: 'New Book', author: 'Author' };
    booksRepository.httpGateway.post.mockResolvedValue({ status: 'ok' });

    const result = await booksRepository.addBook(book);

    expect(result).toBe(true);
    expect(booksRepository.httpGateway.post).toHaveBeenCalledWith('/', book);
  });

  it('returns false when API returns error status', async () => {
    const book = { name: 'New Book', author: 'Author' };
    booksRepository.httpGateway.post.mockResolvedValue({ status: 'error' });

    expect(await booksRepository.addBook(book)).toBe(false);
  });

  it('returns false when API returns null', async () => {
    booksRepository.httpGateway.post.mockResolvedValue(null);
    expect(await booksRepository.addBook({})).toBe(false);
  });
});