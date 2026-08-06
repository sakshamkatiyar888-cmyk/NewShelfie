import "./ErrorState.css";

function ErrorState({ message }) {
  return (
    <div className="error-state">
      <h2>⚠️ Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;