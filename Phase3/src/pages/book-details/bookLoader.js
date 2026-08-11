export function bookLoader({ params }) {
  const bookKey = decodeURIComponent(params.id);

  if (!bookKey.startsWith("/works/")) {
    throw new Response("Book not found", {
      status: 404,
      statusText: "Book not found",
    });
  }

  const bookPromise = fetch(
    `https://openlibrary.org${bookKey}.json`
  ).then((response) => {
    if (!response.ok) {
      throw new Response("Book not found", {
        status: response.status,
        statusText: "Book not found",
      });
    }

    return response.json();
  });

  return {
    bookPromise,
  };
}