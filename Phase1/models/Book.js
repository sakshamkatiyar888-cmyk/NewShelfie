class Book {
  constructor(
    title,
    author,
    status = "unread",
    rating = 0
  ) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.rating = rating;
  }
}

export default Book;