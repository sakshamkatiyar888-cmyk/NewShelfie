import Library from "./models/Library.js";
import sampleBooks from "./data/sampleBooks.js";
import { printHeading, printBooks } from "./utils/helper.js";

const library = new Library();

sampleBooks.forEach((book) => {
  library.addBook(book);
});

printHeading("All Books");

printBooks(library.getAllBooks());

printHeading("Statistics");

console.log(library.generateStats());
