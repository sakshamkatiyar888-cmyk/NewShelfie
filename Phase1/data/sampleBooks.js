import Book from "../models/Book.js";
import RareBook from "../models/RareBook.js";

const sampleBooks = [
  new Book(
    "Atomic Habits",
    "James Clear",
    "reading",
    5
  ),

  new Book(
    "Clean Code",
    "Robert C. Martin",
    "finished",
    5
  ),

  new Book(
    "Deep Work",
    "Cal Newport",
    "unread",
    4
  ),

  new RareBook(
    "Harry Potter First Edition",
    "J.K. Rowling",
    "finished",
    5,
    250000
  )
];

export default sampleBooks;