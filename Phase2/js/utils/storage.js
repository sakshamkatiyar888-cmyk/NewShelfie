import { STORAGE } from "./constants.js";
const STORAGE_KEY = STORAGE.KEY;

export function getBooks() {
  const books = localStorage.getItem(STORAGE_KEY);
  return books ? JSON.parse(books) : [];
}

export function saveBook(book) {
  const books = getBooks();

  const exists = books.some(
    (item) => item.key === book.key
  );

  if (exists) {
    return false;
  }

  books.push(book);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(books)
  );

  return true;
}
export function removeBook(key) {
  const books = getBooks().filter(
    (book) => book.key !== key
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(books)
  );
}