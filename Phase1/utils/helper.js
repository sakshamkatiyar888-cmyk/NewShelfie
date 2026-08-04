export function printHeading(title) {
  console.log("\n========================");
  console.log(title);
  console.log("========================");
}

export function printBooks(books) {
  books.forEach((book, index) => {
    console.log(`${index + 1}. ${book.title} - ${book.author}`);
  });
}