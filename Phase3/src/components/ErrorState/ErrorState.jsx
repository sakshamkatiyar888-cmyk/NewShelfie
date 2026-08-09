import { useRouteError } from "react-router-dom";

import "./ErrorState.css";

function ErrorState({ message }) {
  const routeError = useRouteError();

  const errorMessage =
    message ||
    routeError?.statusText ||
    routeError?.message ||
    "Something went wrong.";

  return (
    <div className="error-state">
      <h2>⚠️ Something went wrong</h2>

      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorState;