export const setScreen = (element) => {
  let mainElement = document.querySelector('.main');
  mainElement.parentNode.replaceChild(element, mainElement);
};

export const updateTimer = (timerModel) => {
  let timerElement = document.querySelector('.main #timer');

  if (timerElement) {
    timerElement.innerHTML = `<span class="timer-value-mins">${timerModel.mins}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${timerModel.secs}</span>`;
  }
};

export default setScreen;
