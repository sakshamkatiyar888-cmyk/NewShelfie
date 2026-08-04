export function $(selector) {
  return document.querySelector(selector);
}

export function clearElement(element) {
  element.innerHTML = "";
}

export function renderHTML(element, html) {
  element.innerHTML = html;
}

export function appendHTML(element, html) {
  element.insertAdjacentHTML("beforeend", html);
}