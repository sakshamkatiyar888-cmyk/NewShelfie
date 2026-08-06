import { useContext } from "react";

import ThemeContext from "../../context/ThemeContext";
import { useSelector } from "react-redux";

import "./Header.css";

function Header() {
  const { theme, toggleTheme } =
    useContext(ThemeContext);

const myBooks = useSelector(
  (state) => state.library.myBooks
);

  return (
    <header className="header">
      <div
        className="logo"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <span className="logo-icon">📚</span>

        <h1>Shelfie</h1>
      </div>

      <div className="header-actions">
        <button
          className="my-list-btn"
          onClick={() =>
            document
              .getElementById("my-library")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          ❤️ My Library ({myBooks.length})
        </button>

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