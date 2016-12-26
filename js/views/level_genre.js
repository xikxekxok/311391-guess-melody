import {registerClickHandler, registerSubmitHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';
import AbstractView from './abstractView';
import player from '../import/player';

export default class LevelGenreView extends AbstractView {
  constructor(questionModel, answerCallback) {
    super();

    checkIsProvided(questionModel, 'questionModel');
    this._questionModel = questionModel;

    checkIsProvided(answerCallback, 'answerCallback');
    this._answerCallback = (answer) => {
      this._players.forEach((x) => x());
      answerCallback(answer);
    };

    this._players = [];
  }

  getMarkup() {
    return `<section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"></circle>
    </svg>
    <div class="main-wrap">
    <h2 class="title">${this._questionModel.question}</h2>
    <div class="genre">
      ${this._questionModel.answers.map((answerModel) => `<div class="genre-answer">
        <div class="player-wrapper" id="player-${answerModel.id}"></div>
        <input type="checkbox" name="answer" value="answer-${answerModel.id}" id="a-${answerModel.id}">
        <label class="genre-answer-check" for="a-${answerModel.id}"></label>
      </div>`).join('')}
      <button class="genre-answer-send" id="submit_genre">Ответить</button>
    </form>
    </div>
    </section>`;
  }

  bindHandlers() {
    this._bindAnswers();

    registerClickHandler(this._element, '#submit_genre', () => {
      this._answerCallback(this._answers.filter((x) => x.selected).map((x) => x.id));
    });
  }

  clearHandlers() {

  }

  get _answers() {
    if (!this._answersCache) {
      let result = this._questionModel.answers.map((x) => {
        return {
          id: x.id,
          selected: false,
          src: x.src
        };
      });
      this._answersCache = result;
    }

    return this._answersCache;
  }

  _bindAnswers() {
    for (let value of this._answers) {
      let closure = value;
      registerClickHandler(this._element, `#a-${value.id}`, () => {
        closure.selected = !closure.selected;
        this._setButtonState();
      });

      const playerElement = this._element.querySelector(`#player-${value.id}`);
      this._players.push(player(playerElement, value.src, false, true));
    }

    this._setButtonState();
  }

  _setButtonState() {
    let button = this._element.querySelector('.genre-answer-send');
    let newState = this._answers.filter((x) => x.selected).length === 0;

    button.disabled = newState;
  }
}
