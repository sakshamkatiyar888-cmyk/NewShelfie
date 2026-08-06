import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../redux/slices/librarySlice";

import BookCard from "../BookCard/BookCard";
import "./BookList.css";

function BookList({ books }) {
  const dispatch = useDispatch();

  const myBooks = useSelector(
    (state) => state.library.myBooks
  );

  return (
    <section className="book-list">
      {books.map((book) => {
        const isAdded = myBooks.some(
          (item) => item.key === book.key
        );

        return (
          <BookCard
            key={book.key}
            book={book}
            buttonText={isAdded ? "✓ Added" : "Save to My List"}
            buttonVariant={isAdded ? "success" : "primary"}
            onButtonClick={() => dispatch(addBook(book))}
          />
        );
      })}
    </section>
  );
}

export default BookList;