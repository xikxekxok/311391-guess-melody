import {registerClickHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';
import AbstractView from './abstractView';

// TODO если не будет дальше по заданиям - добавить числительные у процентов + переводить секунды в минуты и секунды
export default class LevelGenreView extends AbstractView {
  constructor(resultModel, callBack) {
    super();

    checkIsProvided(resultModel, 'resultModel');
    this._resultModel = resultModel;

    checkIsProvided(callBack, 'callBack');
    this._callBack = callBack;
  }

  getMarkup() {
    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this._resultModel.resultText}</h2>
      <div class="main-stat">За&nbsp;${this._resultModel.minuteCount}&nbsp;секунды<br>вы&nbsp;
        отгадали ${this._resultModel.guessCount}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this._resultModel.betterPercent}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  bindHandlers() {
    registerClickHandler(this._element, '.main-replay', this._callBack);
  }

  clearHandlers() {

  }
}
