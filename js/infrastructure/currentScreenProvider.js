const setScreen = (element, withTimer) => {
  let mainElement = document.querySelector('.main');
  mainElement.parentNode.replaceChild(element, mainElement);
};

export default setScreen;
