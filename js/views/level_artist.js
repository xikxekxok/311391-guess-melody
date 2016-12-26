import {registerClickHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';
import AbstractView from './abstractView';
import player from '../import/player';

export default class LevelArtistView extends AbstractView {
  constructor(questionModel, answerCallback) {
    super();

    checkIsProvided(questionModel, 'questionModel');
    this._questionModel = questionModel;

    checkIsProvided(answerCallback, 'answerCallback');
    this._answerCallback = (answer) => {
      this._player();
      answerCallback(answer);
    };
  }

  getMarkup() {
    return `<section class="main main--level main--level-artist">
    <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">${this._questionModel.question}</h2>

      <div class="player-wrapper"></div>
      <form class="main-list">
        ${this._questionModel.answers.map((answerModel) => `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${answerModel.id}" name="answer" value="val-1" />
          <label class="main-answer" for="answer-${answerModel.id}" id="answerlabel-${answerModel.id}">
            <img class="main-answer-preview" src="${answerModel.image.url}" width="${answerModel.image.width}" height="${answerModel.image.height}">
            ${answerModel.text}
          </label>
        </div>`).join('')}
      </form>
    </div>
  </section>`;
  }

  bindHandlers() {
    for (let answer of this._questionModel.answers) {
      let closure = answer.id;
      registerClickHandler(this._element, `#answerlabel-${closure}`, () => this._answerCallback(closure));
    }

    const playerElement = this._element.querySelector('.player-wrapper');
    this._player = player(playerElement, this._questionModel.src, true, false);
  }

  clearHandlers() {

  }
}
