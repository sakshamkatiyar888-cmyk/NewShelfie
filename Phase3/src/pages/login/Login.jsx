import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

import store from "../../redux/store";
import { login } from "../../redux/slices/authSlice";

import "./Login.css";


async function loginFormAction(previousState, formData) {
  const username = formData.get("username");
  const from = formData.get("from") || "/library";

  if (!username || !username.trim()) {
    return {
      error: "Username is required.",
    };
  }

  if (username.trim().length < 3) {
    return {
      error: "Username must be at least 3 characters long.",
    };
  }

  const fakeToken = `fake-token-${Date.now()}`;

  store.dispatch(login(fakeToken));

  return {
    success: true,
    redirectTo: from,
  };
}


function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="login-button"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Login to Shelfie"}
    </button>
  );
}


function Login() {
  const [state, formAction] = useActionState(
    loginFormAction,
    null
  );

  const location = useLocation();
  const navigate = useNavigate();

  if (state?.success) {
    navigate(state.redirectTo, { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-card">

        <div className="login-icon">
          📚
        </div>

        <div className="login-header">
          <h1>Welcome Back</h1>

          <p>
            Sign in to continue managing your
            personal bookshelf.
          </p>
        </div>

        <form
          action={formAction}
          className="login-form"
        >
          <input
            type="hidden"
            name="from"
            value={location.state?.from || "/library"}
          />

          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              required
              minLength={3}
            />
          </div>

          {state?.error && (
            <p className="login-error">
              ⚠️ {state.error}
            </p>
          )}

          <LoginButton />
        </form>

        <p className="login-footer">
          Your personal library is waiting for you 📖
        </p>

      </section>
    </main>
  );
}

export default Login;