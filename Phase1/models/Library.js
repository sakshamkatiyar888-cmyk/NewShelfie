import Book from "./Book.js";
import RareBook from "./RareBook.js";

class Library {
  constructor() {
    let books = [];
    let history=[];

    const saveHistory=()=>{
        history.push(
            structuredClone(books)
        );
    };
    

    this.getAllBooks = function () {
      return [...books];
    };

    this.addBook = function (book) {
      if (!(book instanceof Book || book instanceof RareBook)) {
        throw new Error("Only Book or RareBook instances can be added.");
      }

      const alreadyExists = books.some(
        (item) => item.title === book.title
      );

      if (alreadyExists) {
        throw new Error("Book with this title already exists.");
      }
      saveHistory();
      books.push(book);

      return book;
    };

    this.removeBook = function (title) {
      const index = books.findIndex(
        (book) => book.title === title
      );

      if (index === -1) {
        throw new Error("Book not found.");
      }
        saveHistory();
      const removedBook = books.splice(index, 1);

      return removedBook[0];
    };
    this.markAsFinished = function (title) {
       const book = books.find(
         (item) => item.title === title
       );

      if (!book) {
        throw new Error("Book not found.");
      }

      if (book.status === "finished") {
       throw new Error("Book is already marked as finished.");
     }

     saveHistory();
     book.status = "finished";

     return book;
  };
  this.undo = function () {

  if (history.length === 0) {
    throw new Error("Nothing to undo.");
  }

  books = history.pop();

  return [...books];

};
  this.getBooksByStatus = function (status) {
  const validStatuses = [
    "unread",
    "reading",
    "finished",
  ];

  const normalizedStatus = status.toLowerCase();

  if (!validStatuses.includes(normalizedStatus)) {
    throw new Error(
      "Status must be unread, reading or finished."
    );
  }

  return books.filter(
    (book) => book.status.toLowerCase() === normalizedStatus
  );
};
this.generateStats = function () {
  const totalBooks = books.length;

  const ratings = books.map((book) => book.rating);

  const totalRating = ratings.reduce(
    (sum, rating) => sum + rating,
    0
  );

  const averageRating =
    totalBooks === 0 ? 0 : totalRating / totalBooks;

  const unreadCount = books.filter(
    (book) => book.status === "unread"
  ).length;

  const readingCount = books.filter(
    (book) => book.status === "reading"
  ).length;

  const finishedCount = books.filter(
    (book) => book.status === "finished"
  ).length;

  return {
    totalBooks,
    averageRating: Number(averageRating.toFixed(2)),
    countByStatus: {
      unread: unreadCount,
      reading: readingCount,
      finished: finishedCount,
    },
  };
};
  }
}
Library.prototype.mergeWith = function (otherLibrary) {

  if (!(otherLibrary instanceof Library)) {
    throw new Error("Argument must be a Library instance.");
  }

  const books = otherLibrary.getAllBooks();

  for (const book of books) {

    const alreadyExists = this
      .getAllBooks()
      .some(item => item.title === book.title);

    if (!alreadyExists) {
      this.addBook(book);
    }

  }

  return this;
};

export default Library;
