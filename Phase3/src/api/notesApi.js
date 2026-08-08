import notesClient from "./notesClient";

export async function getNotesByBook(bookId) {
  const response = await notesClient.get("/notes", {
    params: {
      bookId,
    },
  });

  return response.data;
}

export async function addNote(note) {
  const response = await notesClient.post("/notes", note);

  return response.data;
}

export async function updateNote(id, note) {
  const response = await notesClient.put(
    `/notes/${id}`,
    note
  );

  return response.data;
}

export async function deleteNote(id) {
  await notesClient.delete(`/notes/${id}`);

  return true;
}