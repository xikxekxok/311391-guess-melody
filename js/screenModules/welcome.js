import getElementFromTemplate from '../infrastructure/elementProvider';
import {registerClickHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';

const getWelcomeScreen = () => getElementFromTemplate(
    `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      На&nbsp;каждую мелодию всего 3 варианта ответа.<br>
      Удачи!
    </p>
  </section>`
);

const getMainView = (nextScreenCallback) => {
  checkIsProvided(nextScreenCallback, 'nextScreenCallback');

  let element = getWelcomeScreen();

  registerClickHandler(element, '.main-play', nextScreenCallback);

  return element;
};


export default getMainView;
