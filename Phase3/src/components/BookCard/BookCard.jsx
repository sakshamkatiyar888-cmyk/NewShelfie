import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  startReading,
  markAsFinished,
  markAsUnread,
} from "../../redux/slices/librarySlice";
import { updateReadingStreak } from "../../redux/slices/streakSlice";

function BookCard({
  book,
  buttonText,
  buttonVariant = "primary",
  onButtonClick,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://placehold.co/300x450/e2e8f0/64748b?text=No+Cover";

  const isAdded = buttonText === "✓ Added";

  const handleNavigate = () => {
    navigate(`/book/${encodeURIComponent(book.key)}`, {
      state: { book },
    });
  };

  const handleStartReading = () => {
    dispatch(startReading(book.key));
  };

  const handleMarkFinished = () => {
    dispatch(markAsFinished(book.key));
    dispatch(updateReadingStreak());
  };

  const handleMarkUnread = () => {
    dispatch(markAsUnread(book.key));
  };

  return (
    <article className="book-card">
      <img
        src={cover}
        alt={book.title}
        className="book-cover"
      />

      <div className="book-content">
    
        <h3 onClick={handleNavigate}>
          {book.title}
        </h3>

        <p className="author">
          {book.author_name?.[0] || "Unknown Author"}
        </p>

        {book.rating !== undefined && (
          <p className="rating">
            ⭐ Rating: {book.rating}
          </p>
        )}

        {/* Reading Status - Only My Library */}
        {buttonText === "Remove" && (
          <div className="reading-status">
            <p>
              Status: <strong>{book.status}</strong>
            </p>

            {book.status === "unread" && (
              <button
                className="status-btn reading"
                onClick={handleStartReading}
              >
                📖 Start Reading
              </button>
            )}

            {book.status === "reading" && (
              <button
                className="status-btn finished"
                onClick={handleMarkFinished}
              >
                ✅ Mark as Finished
              </button>
            )}

            {book.status === "finished" && (
              <button
                className="status-btn unread"
                onClick={handleMarkUnread}
              >
                ↩️ Mark as Unread
              </button>
            )}
          </div>
        )}

        <button
          className={`book-btn ${buttonVariant}`}
          disabled={isAdded}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
}

export default BookCard;