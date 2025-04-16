import booksController from "../controllers/BooksController";

class Application {
  constructor() {
    this.controllers = {
      books: booksController
    };
  }

  initialize() {
    this.controllers.books.initialize();
  }
}


const app = new Application();
export default app;