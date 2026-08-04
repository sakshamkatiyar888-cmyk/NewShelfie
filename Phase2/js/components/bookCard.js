import { getBooks } from "../utils/storage.js";

export function createBookCard(book, isMyList = false) {

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://placehold.co/300x450?text=No+Cover";

  const isAdded = getBooks().some(
    (item) => item.key === book.key
  );

  return `
    <article class="book-card">

      <img src="${cover}" alt="${book.title}">

      <div class="book-card-content">

        <h3>${book.title}</h3>

        <p>${book.author_name?.[0] || "Unknown Author"}</p>

        <small>${book.first_publish_year || "N/A"}</small>

        ${
          isMyList
            ? `
              <button class="remove-btn" data-key="${book.key}">
                Remove
              </button>
            `
            : `
              <button
                class="${isAdded ? "added-btn" : "my-list-btn"}"
                data-key="${book.key}"
                ${isAdded ? "disabled" : ""}
              >
                ${isAdded ? "✔ Added" : "+ My List"}
              </button>
            `
        }

      </div>

    </article>
  `;
}