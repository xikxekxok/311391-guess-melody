export const setScreen = (element, withTimer) => {
  let mainElement = document.querySelector('.main');
  mainElement.parentNode.replaceChild(element, mainElement);


  // let timerElement = document.querySelector('#timer');
  // timerElement.style.visibility = withTimer
  //   ? 'visible'
  //   : 'hidden';
};

// export const updateTimer = (timerModel) => {
//   let mins = document.querySelector('#timer .timer-value-mins');
//   mins.innerHTML = timerModel.mins;

//   let secs = document.querySelector('#timer .timer-value-secs');
//   secs.innerHTML = timerModel.secs.toLocaleString('ru-RU', {minimumIntegerDigits: 2});
// };

export default setScreen;
