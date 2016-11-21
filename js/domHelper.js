export const onClick = (selector, callback) => {
  let elements = document.querySelectorAll(selector);

  for (let element of elements) {
    element.addEventListener('click', callback);
  }
};

export const onSubmit = (selector, callback, stop) => {
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
