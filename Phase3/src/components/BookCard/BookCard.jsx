import "./BookCard.css";
import { useNavigate } from "react-router-dom";

function BookCard({
  book,
  buttonText,
  buttonVariant = "primary",
  onButtonClick,
}) {
  const navigate = useNavigate();

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://placehold.co/300x450/e2e8f0/64748b?text=No+Cover";

  const isAdded = buttonText === "✓ Added";

  const handleNavigate = () => {
    navigate(
      `/book/${encodeURIComponent(book.key)}`,
      {
        state: {
          book,
        },
      }
    );
  };

  return (
    <article className="book-card">
      <img
        className="book-cover"
        src={cover}
        alt={book.title}
        onClick={handleNavigate}
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