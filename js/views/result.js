import {registerClickHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';
import AbstractView from './abstractView';

// TODO если не будет дальше по заданиям - добавить числительные у процентов + переводить секунды в минуты и секунды
export default class ResultView extends AbstractView {
  constructor(resultModel, callBack) {
    super();

    checkIsProvided(resultModel, 'resultModel');
    this._resultModel = resultModel;
    this._time = this._timeFormat(resultModel.minuteCount);

    checkIsProvided(callBack, 'callBack');
    this._callBack = callBack;
  }

  getMarkup() {
    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this._resultModel.resultText}</h2>
      <div class="main-stat">За ${this._time.minutes ? this._time.minutes + ' ' + this._declOfMin(this._time.minutes) + ' ' : ''}
        ${this._time.seconds} ${this._declOfSec(this._time.seconds)}<br>вы&nbsp;
        отгадали ${this._resultModel.guessCount} ${this._declOfMelody(this._resultModel.guessCount)}</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this._resultModel.betterPercent}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  bindHandlers() {
    registerClickHandler(this._element, '.main-replay', this._callBack);
  }

  clearHandlers() {

  }

  _timeFormat(seconds) {
    return {
      minutes: Math.floor(seconds / 60),
      seconds: seconds % 60
    };
  }
  _declOfMin(val) {
    return this._declOfNum(val, ['минуту', 'минуты', 'минут']);
  }

  _declOfSec(val) {
    return this._declOfNum(val, ['секунду', 'секунды', 'секунд']);
  }

  _declOfMelody(val) {
    return this._declOfNum(val, ['мелодию', 'мелодии', 'мелодий']);
  }

  _declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }
}
