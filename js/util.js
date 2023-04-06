export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getAllElements(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

export function createElementWithClass(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}
