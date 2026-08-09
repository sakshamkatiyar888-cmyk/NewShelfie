import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ThemeContext from "../../context/ThemeContext";

import { logout } from "../../redux/slices/authSlice";

import "./Header.css";

function Header() {
  const { theme, toggleTheme } =
    useContext(ThemeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myBooks = useSelector(
    (state) => state.library.myBooks
  );

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  function handleLogoClick() {
    navigate("/");
  }

  function handleMyLibraryClick() {
    navigate("/library");
  }

  function handleLogout() {
    dispatch(logout());
    navigate("/login", { replace: true });
  }

  return (
    <header className="header">
      <div
        className="logo"
        onClick={handleLogoClick}
      >
        <span>📚</span>

        <h1>Shelfie</h1>
      </div>

      <div className="header-actions">
        <button
          className="my-list-btn"
          onClick={handleMyLibraryClick}
        >
          ❤️ My Library ({myBooks.length})
        </button>

        {isAuthenticated && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        )}

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "light"
            ? "🌙 Dark"
            : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}

export default Header;