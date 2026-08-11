import {use} from "react";
import BookNotes from "../../components/BookNotes/BookNotes";
import {
  useLoaderData,
  useLocation,
} from "react-router-dom";

import "./BookDetails.css";

function BookDetails() {
  const { bookPromise } = useLoaderData();
  const book = use(bookPromise);

  const location = useLocation();

  const searchBook = location.state?.book;

  const bookKey = book.key;

  const description =
    typeof book?.description === "string"
      ? book.description
      : book?.description?.value;

  return (
    <main className="book-details">

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
          {searchBook?.author_name?.[0] || "Unknown Author"}
        </p>

        <p>
          <strong>First Publish:</strong>{" "}
          {searchBook?.first_publish_year ||
            book.first_publish_date ||
            "Unknown"}
        </p>

        <h3>Description</h3>

        <p className="book-description">
          {description || "No description available."}
        </p>

        {book.subjects && (
          <>
            <h3>Subjects</h3>

            <div className="subjects">
              {book.subjects.slice(0, 10).map((subject) => (
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

      <BookNotes bookId={bookKey} />

    </main>
  );
}

export default BookDetails;