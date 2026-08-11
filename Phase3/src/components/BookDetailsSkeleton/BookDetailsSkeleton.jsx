import "./BookDetailsSkeleton.css";
function BookDetailsSkeleton() {
  return (
    <main className="book-details skeleton-details">
      <div className="skeleton-cover"></div>

      <div className="details-info">
        <div className="skeleton-title"></div>

        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>

        <div className="skeleton-heading"></div>

        <div className="skeleton-description"></div>
        <div className="skeleton-description short"></div>

        <div className="skeleton-heading"></div>

        <div className="skeleton-subjects">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </main>
  );
}

export default BookDetailsSkeleton;