import { getBooks,removeBook } from "../utils/storage.js";
import { createBookCard } from "./bookCard.js";
import { $,clearElement,appendHTML} from "../utils/domHelpers.js";
import { appState } from "../state/appState.js";

const myListContainer = $("#myListContainer");
const bookCount = document.getElementById("bookCount");

export function renderMyList() {
  const books = getBooks();
  appState.myList = books;

  bookCount.textContent = books.length;

  if (!books.length) {
    myListContainer.innerHTML = `
      <p class="empty">No books added yet.</p>
    `;
    return;
  }

  clearElement(myListContainer);

  books.forEach((book) => {
   appendHTML(
  myListContainer,
  createBookCard(book, true)
);
  });
  document.querySelectorAll(".remove-btn").forEach((button)=>{

    button.addEventListener("click",()=>{

        removeBook(button.dataset.key);

        renderMyList();

    });

});
}
export function scrollToMyList() {
  const myListSection = document.querySelector(".my-list");

  myListSection.scrollIntoView({
    behavior: "smooth"
  });
}