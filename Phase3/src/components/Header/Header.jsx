import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ThemeContext from "../../context/ThemeContext";

import "./Header.css";

function Header() {
  const { theme, toggleTheme } =
    useContext(ThemeContext);

  const myBooks = useSelector(
    (state) => state.library.myBooks
  );

  const navigate = useNavigate();

  function handleLogoClick() {
    navigate("/");
  }

  function handleMyLibraryClick() {
    navigate("/");

    setTimeout(() => {
      document
        .getElementById("my-library")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  }

  return (
    <header className="header">
      <div
        className="logo"
        onClick={handleLogoClick}
      >
        📚

        <h1>Shelfie</h1>
      </div>

      <div className="header-actions">
        <button
          className="my-list-btn"
          onClick={handleMyLibraryClick}
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