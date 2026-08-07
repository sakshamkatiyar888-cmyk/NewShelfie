import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Spinner from "../../components/Spinner/Spinner";
import ErrorState from "../../components/ErrorState/ErrorState";

import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchBook = location.state?.book;

  const bookKey = decodeURIComponent(id);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const description =
    typeof book?.description === "string"
      ? book.description
      : book?.description?.value;

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://openlibrary.org${bookKey}.json`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch book details."
          );
        }

        const data = await response.json();

        setBook(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [bookKey]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
   <div className="book-details">
  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

  <div className="details-content">

    {searchBook?.cover_i && (
      <img
        className="details-cover"
        src={`https://covers.openlibrary.org/b/id/${searchBook.cover_i}-L.jpg`}
        alt={book.title}
      />
    )}

    <div className="details-info">
      <h1>{book.title}</h1>

      <p>
        <strong>Author:</strong>{" "}
        {searchBook?.author_name?.[0] ||
          "Unknown Author"}
      </p>

      <p>
        <strong>First Publish:</strong>{" "}
        {searchBook?.first_publish_year ||
          book.first_publish_date ||
          "Unknown"}
      </p>

      <h3>Description</h3>

      <p className="book-description">
        {description ||
          "No description available."}
      </p>

      {book.subjects && (
        <>
          <h3>Subjects</h3>

          <div className="subjects">
            {book.subjects
              .slice(0, 10)
              .map((subject) => (
                <span
                  key={subject}
                  className="subject-tag"
                >
                  {subject}
                </span>
              ))}
          </div>
        </>
      )}
    </div>

  </div>
</div>
  );
}

export default BookDetails;