export function showNoResults(container) {
  container.innerHTML = `
    <div class="error-state">
      <h3>No Books Found 📚</h3>
      <p>Try searching with another keyword.</p>
    </div>
  `;
}

export function showError(container) {
  container.innerHTML = `
    <div class="error-state">
      <h3>Something went wrong ⚠️</h3>
      <p>Please try again later.</p>
    </div>
  `;
}