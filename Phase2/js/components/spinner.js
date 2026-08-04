export function showSpinner(container) {
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
    </div>
  `;
}

export function hideSpinner(container) {
  container.innerHTML = "";
}