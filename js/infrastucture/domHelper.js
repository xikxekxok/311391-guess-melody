export const registerClickHandler = (selector, callback) => {
  let elements = document.querySelectorAll(selector);

  for (let element of elements) {
    element.addEventListener('click', callback);
  }
};

export const registerSubmitHandler = (selector, callback, stop) => {
  let elements = document.querySelectorAll(selector);

  for (let element of elements) {
    element.addEventListener('submit', (event) => {
      callback();
      if (stop) {
        event.preventDefault();
      }
    });
  }
};
