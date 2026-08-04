import { debounce } from "../utils/debounce.js";
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

export function getSearchQuery() {
  return searchInput.value.trim();
}

export function bindSearch(callback) {

  const debouncedSearch = debounce(() => {
    callback(getSearchQuery());
  }, 500);

  searchBtn.addEventListener("click", () => {
    callback(getSearchQuery());
  });

  searchInput.addEventListener("input", () => {
    debouncedSearch();
  });

}