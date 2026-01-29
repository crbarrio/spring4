export function qs<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(selector);
}

export function qsa<T extends HTMLElement>(selector: string): NodeListOf<T> {
  return document.querySelectorAll(selector);
}