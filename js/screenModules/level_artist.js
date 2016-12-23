import getElementFromTemplate from '../infrastructure/elementProvider';
import { registerClickHandler } from '../infrastructure/domHelper';
import { checkIsProvided } from '../infrastructure/throwHelper';
import AbstractView from './abstractView';

 export default class LevelArtistView extends AbstractView {
  constructor(questionModel, answerCallback) {
    super();

    checkIsProvided(questionModel, 'questionModel');
    this._questionModel = questionModel;

    checkIsProvided(answerCallback, 'answerCallback');
    this._answerCallback = answerCallback;
  };

  getMarkup() {
    return `<section class="main main--level main--level-artist">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>
    <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">${this._questionModel.question}</h2>

      <div class="player-wrapper"></div>
      <form class="main-list">
        ${this._questionModel.answers.map((answerModel) => `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${answerModel.id}" name="answer" value="val-1" />
          <label class="main-answer" for="answer-${answerModel.id}">
            <img class="main-answer-preview" src="">
            ${answerModel.text}
          </label>
        </div>`).join('')}
      </form>
    </div>
  </section>`
  };

  bindHandlers() {
    for (let answer of this._questionModel.answers) {
      let closure = answer.id;
      registerClickHandler(this._element, `#answer-${closure}`, () => this._answerCallback(closure));
    }
  };

  clearHandlers() {

  };
}
