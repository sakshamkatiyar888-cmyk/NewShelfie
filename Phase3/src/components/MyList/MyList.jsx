import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBook } from "../../redux/slices/librarySlice";
import BookCard from "../BookCard/BookCard";
import "./MyList.css";

function MyList() {
  const dispatch = useDispatch();

  const myBooks = useSelector(
    (state) => state.library.myBooks
  );
  const streak = useSelector(
    (state) => state.streak.count
  );

  const averageRating = useMemo(() => {
    if (myBooks.length === 0) return 0;

    const total = myBooks.reduce(
      (sum, book) => sum + (book.rating ?? 0),
      0
    );

    return (total / myBooks.length).toFixed(1);
  }, [myBooks]);

  return (
    <section
      id="my-library"
      className="my-list">
      <div className="stats">
        <span>Total Books: {myBooks.length}</span>

        <span>⭐ Average Rating: {averageRating}</span>

        <span>
          ✅ Finished:{" "}
          {
            myBooks.filter(
              (book) => book.status === "finished"
            ).length
          }
        </span>

        <span>
          🔥 Reading Streak: {streak} day(s)
        </span>
      </div>


      {myBooks.length === 0 ? (
        <div className="empty-state">
          <h3>Your library is empty 📚</h3>
          <p>Search books and save your favorites.</p>
        </div>
      ) : (
        <div className="my-list-grid">
          {myBooks.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              buttonText="Remove"
              buttonVariant="danger"
              onButtonClick={() => dispatch(removeBook(book.key))}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyList;