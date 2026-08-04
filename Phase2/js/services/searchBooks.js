import { openLibrarySearch } from "../api/openLibraryApi.js";
import { createBookCard } from "../components/bookCard.js";
import { showSpinner, hideSpinner } from "../components/spinner.js";
import { showNoResults, showError } from "../components/errorState.js";
import { saveBook } from "../utils/storage.js";
import { renderMyList } from "../components/myList.js";
import { appState } from "../state/appState.js";
import { $, clearElement, appendHTML } from "../utils/domHelpers.js";
import { MESSAGES } from "../utils/constants.js";

const bookContainer = $("#resultsContainer");

bookContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("my-list-btn")) return;

  const key = e.target.dataset.key;

  const selectedBook = appState.searchResults.find(
    (book) => book.key === key
  );

  const added = saveBook(selectedBook);

if (added) {

  renderMyList();

  clearElement(bookContainer);

  appState.searchResults.forEach((book) => {
    appendHTML(
      bookContainer,
      createBookCard(book)
    );
  });

  alert(MESSAGES.ADDED);

} else {

  alert(MESSAGES.EXISTS);

}
});

export async function searchBooks(query) {
  if (!query) {
    console.log(MESSAGES.EMPTY_SEARCH);
    return;
  }

  try {
  
    showSpinner(bookContainer);

    const books = await openLibrarySearch(query);

    appState.searchResults = books;

    hideSpinner(bookContainer);

    if (!books.length) {
      showNoResults(bookContainer);
      return;
    }

    clearElement(bookContainer);

    books.forEach((book) => {
      appendHTML(
        bookContainer,
        createBookCard(book)
      );
    });

  } catch (error) {
    hideSpinner(bookContainer);

    console.error("Search Error:", error);

    showError(bookContainer);
  }
}