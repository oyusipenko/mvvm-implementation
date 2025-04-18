import ApiGateway from "../services/ApiGateway.js";

class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async () => {
    const booksDto = await this.httpGateway.get("/");
    return booksDto;
  };

  addBook = async ({ name, author }) => {
    const bookAddDto = await this.httpGateway.post("/", { name, author });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };

}

const booksRepository = new BooksRepository();
export default booksRepository;