import Book from "./Book.js";

class RareBook extends Book {
  constructor(
    title,
    author,
    status,
    rating,
    estimatedValue
  ) {

    super(
      title,
      author,
      status,
      rating
    );

    this.estimatedValue = estimatedValue;
  }
}

export default RareBook;