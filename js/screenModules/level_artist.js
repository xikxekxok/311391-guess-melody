import getElementFromTemplate from '../infrastructure/elementProvider';
import {registerClickHandler} from '../infrastructure/domHelper';

const getTimer = (timerModel) =>
  `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${timerModel.mins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${timerModel.secs}</span>
      </div>
    </svg>`;

const getAnswer = (answerModel) =>
  `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${answerModel.id}" name="answer" value="val-1" />
          <label class="main-answer" for="answer-${answerModel.id}">
            <img class="main-answer-preview" src="">
            ${answerModel.text}
          </label>
        </div>`;

const getLevelArtistScreen = (timer, question) => getElementFromTemplate(
    `<section class="main main--level main--level-artist">
    ${getTimer(timer)}
    <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">${question.question}</h2>

      <div class="player-wrapper"></div>
      <form class="main-list">
        ${question.answers.map((x) => getAnswer(x)).join('')}
      </form>
    </div>
  </section>`
);

const timer = {
  mins: 2,
  secs: 0
};

const getLevelView = (questionModel, answerCallback) => {
  if (questionModel === void (0) ) {
    throw new Error('questionModel not provided!');
  }
  if (answerCallback === void (0) ) {
    throw new Error('answerCallback not provided!');
  }

  let element = getLevelArtistScreen(timer, questionModel);

  for (let answer of questionModel.answers) {
    registerClickHandler(element, `#answer-${answer.id}`, ()=>answerCallback(answer.id));
  }
  return element;
};

export default getLevelView;
