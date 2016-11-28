import getElementFromTemplate from '../elementProvider';
import setScreen from '../currentScreenProvider';
import openWelcomeScreen from './welcome';
import {registerClickHandler} from '../domHelper';

const getResultScreen = (model) => getElementFromTemplate(
    `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${model.resultText}</h2>
    <div class="main-stat">За&nbsp;${model.minuteCount}&nbsp;минуты<br>вы&nbsp;отгадали ${model.guessCount}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${model.betterPercent}%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`
);

const defaultModel = {
  resultText: 'Вы настоящий меломан!',
  minuteCount: 2,
  guessCount: 4,
  betterPercent: 80
};

const open = () => {
  let screen = getResultScreen(defaultModel);
  setScreen(screen);

  registerClickHandler('.main-replay', openWelcomeScreen);
};

export default open;
