import {registerClickHandler, registerSubmitHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';
import AbstractView from './abstractView';

export default class LevelGenreView extends AbstractView {
  constructor(questionModel, answerCallback) {
    super();

    checkIsProvided(questionModel, 'questionModel');
    this._questionModel = questionModel;

    checkIsProvided(answerCallback, 'answerCallback');
    this._answerCallback = answerCallback;
  }

  getMarkup() {
    return `<section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>
    <div class="main-wrap">
    <h2 class="title">${this._questionModel.question}</h2>
    <form class="genre">
      ${this._questionModel.answers.map((answerModel) => `<div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-${answerModel.id}" id="a-${answerModel.id}">
        <label class="genre-answer-check" for="a-${answerModel.id}"></label>
      </div>`).join('')}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
    </div>
  </section>`;
  }

  bindHandlers() {
    this._bindAnswers();

    registerSubmitHandler(this._element, '.genre', () => {
      this._answerCallback(this._checkboxes.filter((x) => x.selected).map((x) => x.id));
    }, true);
  }

  clearHandlers() {

  }

  get _checkboxes() {
    if (!this._checkboxesCache) {
      let result = this._questionModel.answers.map((x) => {
        return {id: x.id, selected: false};
      });
      this._checkboxesCache = result;
    }

    return this._checkboxesCache;
  }

  _bindAnswers() {
    for (let value of this._checkboxes) {
      let closure = value;
      registerClickHandler(this._element, `#a-${value.id}`, () => {
        closure.selected = !closure.selected;
        this._setButtonState();
      });
    }

    this._setButtonState();
  }

  _setButtonState() {
    let button = this._element.querySelector('.genre-answer-send');
    let newState = this._checkboxes.filter((x) => x.selected).length === 0;

    button.disabled = newState;
  }
}
