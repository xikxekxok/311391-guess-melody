export const registerClickHandler = (root, selector, callback) => {
  let elements = root.querySelectorAll(selector);

  for (let element of elements) {
    element.addEventListener('click', callback);
  }
};

export const registerSubmitHandler = (root, selector, callback, stop) => {
  let elements = root.querySelectorAll(selector);

  for (let element of elements) {
    element.addEventListener('submit', (event) => {
      if (stop) {
        event.preventDefault();
      }
      callback();
    });
  }
};
