import {registerClickHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';
import AbstractView from './abstractView';

export default class WelcomeView extends AbstractView {

  constructor(nextScreenCallback) {
    super();

    checkIsProvided(nextScreenCallback, 'nextScreenCallback');
    this._nextScreenCallback = nextScreenCallback;
  }

  getMarkup() {
    return `<section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;2 минуты дать
        максимальное количество правильных ответов.<br>
        На&nbsp;каждую мелодию всего 3 варианта ответа.<br>
        Удачи!
      </p>
    </section>`;
  }

  bindHandlers() {
    registerClickHandler(this._element, '.main-play', this._nextScreenCallback);
  }

  clearHandlers() {

  }
}
