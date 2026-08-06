import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">
      <h2>📚 No books found</h2>

      <p>
        Try another search keyword.
      </p>
    </div>
  );
}

export default EmptyState;