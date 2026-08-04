import { searchBooks } from "./api/openLibraryApi.js";
import { createBookCard } from "./components/BookCard.js";

export function initApp() {

  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");
  const results = document.getElementById("resultsContainer");

  async function performSearch() {

    const query = input.value.trim();

    if (!query) return;

    const books = await searchBooks(query);

    results.innerHTML = books
      .slice(0, 20)
      .map(createBookCard)
      .join("");
  }

  button.addEventListener("click", performSearch);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

}