class Book {
  constructor(id, name, author, isPrivate = false) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.isPrivate = isPrivate;
  }
}

export default Book;