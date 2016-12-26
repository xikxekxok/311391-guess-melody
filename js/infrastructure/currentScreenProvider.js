const setScreen = (element) => {
  let mainElement = document.querySelector('.main');
  mainElement.parentNode.replaceChild(element, mainElement);
};

export default setScreen;
