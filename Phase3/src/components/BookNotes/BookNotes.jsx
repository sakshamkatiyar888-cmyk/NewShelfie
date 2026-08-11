import {
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import {
  addNote,
  getNotesByBook,
  updateNote,
  deleteNote,
} from "../../api/notesApi";

import "./BookNotes.css";

function BookNotes({ bookId }) {
  const [notes, setNotes] = useState([]);

  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    notes,
    (currentNotes, optimisticNote) => [
      ...currentNotes,
      optimisticNote,
    ]
  );

  const [isPending, startTransition] = useTransition();

  const [note, setNote] = useState("");
  const [rating, setRating] = useState(5);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true);
        setError("");

        const data = await getNotesByBook(bookId);

        setNotes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, [bookId]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!note.trim()) {
      setError("Please write a note first.");
      return;
    }

    setError("");

    const noteData = {
      bookId,
      note: note.trim(),
      rating: Number(rating),
      createdAt: new Date().toISOString(),
    };

    // =========================
    // UPDATE NOTE
    // =========================

    if (editingId) {
      try {
        setSaving(true);

        const updatedNote = await updateNote(
          editingId,
          noteData
        );

        setNotes((currentNotes) =>
          currentNotes.map((item) =>
            item.id === editingId
              ? updatedNote
              : item
          )
        );

        setEditingId(null);
        setNote("");
        setRating(5);
      } catch (error) {
        setError(error.message);
      } finally {
        setSaving(false);
      }

      return;
    }

    // =========================
    // OPTIMISTIC ADD
    // =========================

    const optimisticNote = {
      ...noteData,
      id: `temp-${Date.now()}`,
    };

    setNote("");
    setRating(5);

    startTransition(async () => {
      addOptimisticNote(optimisticNote);

      try {
        setSaving(true);

        await addNote(noteData);

        const data = await getNotesByBook(bookId);

        setNotes(data);
      } catch (error) {
        setError(
          error.message || "Failed to add note."
        );
      } finally {
        setSaving(false);
      }
    });
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setNote(item.note);
    setRating(item.rating);
    setError("");
  }

  async function handleDelete(id) {
    try {
      setError("");

      await deleteNote(id);

      setNotes((currentNotes) =>
        currentNotes.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setNote("");
    setRating(5);
    setError("");
  }

  return (
    <section className="book-notes">
      <h2>My Notes</h2>

      <form
        className="note-form"
        onSubmit={handleSubmit}
      >
        <textarea
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          placeholder="Write your note about this book..."
          rows="4"
          disabled={saving || isPending}
        />

        <select
          value={rating}
          onChange={(event) =>
            setRating(event.target.value)
          }
          disabled={saving || isPending}
        >
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>

        <div className="note-actions">
          <button
            type="submit"
            disabled={saving || isPending}
          >
            {saving || isPending
              ? "Saving..."
              : editingId
              ? "Update Note"
              : "Add Note"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={saving || isPending}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading && (
        <p>Loading notes...</p>
      )}

      {error && (
        <p className="notes-error">
          {error}
        </p>
      )}

      {!loading && optimisticNotes.length === 0 && (
        <p className="no-notes">
          No notes added yet.
        </p>
      )}

      <div className="notes-list">
        {optimisticNotes.map((item) => (
          <article
            className="note-card"
            key={item.id}
          >
            <p>{item.note}</p>

            <span>
              Rating: {item.rating} ⭐
            </span>

            <div className="note-card-actions">
              <button
                type="button"
                onClick={() =>
                  handleEdit(item)
                }
                disabled={
                  saving ||
                  isPending ||
                  String(item.id).startsWith("temp-")
                }
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(item.id)
                }
                disabled={
                  saving ||
                  isPending ||
                  String(item.id).startsWith("temp-")
                }
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BookNotes;
