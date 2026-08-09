import { Form, useActionData } from "react-router-dom";

import "./Login.css";

function Login() {
  const actionData = useActionData();

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

        <Form method="post" className="login-form">
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

          {actionData?.error && (
            <p className="login-error">
              ⚠️ {actionData.error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Login to Shelfie
          </button>
        </Form>

        <p className="login-footer">
          Your personal library is waiting for you 📖
        </p>
      </section>
    </main>
  );
}

export default Login;