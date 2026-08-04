import { bindSearch } from "./components/searchForm.js";
import { renderMyList } from "./components/myList.js";
import { searchBooks } from "./services/searchBooks.js";

bindSearch((query) => {
  searchBooks(query);
});

renderMyList();

const homeView = document.getElementById("homeView");
const myListView = document.getElementById("myListView");

const myListBtn = document.getElementById("myListBtn");
const homeBtn = document.getElementById("homeBtn");

// Show My List
myListBtn.addEventListener("click", () => {
  homeView.style.display = "none";
  myListView.style.display = "block";
});

// Show Home
homeBtn.addEventListener("click", () => {
  myListView.style.display = "none";
  homeView.style.display = "block";
});