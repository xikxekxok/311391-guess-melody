import getElementFromTemplate from '../infrastructure/elementProvider';
import {registerClickHandler} from '../infrastructure/domHelper';

const getResultScreen = (model) => getElementFromTemplate(
    `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${model.resultText}</h2>
    <div class="main-stat">За&nbsp;${model.minuteCount}&nbsp;минуты<br>вы&nbsp;отгадали ${model.guessCount}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${model.betterPercent}%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`
);

const getResultView = (resultModel, callBack) => {
  if (resultModel === void (0) ) {
    throw new Error('resultModel not provided!');
  }
  if (callBack === void (0) ) {
    throw new Error('callBack not provided!');
  }

  let element = getResultScreen(resultModel);

  registerClickHandler(element, '.main-replay', callBack);

  return element;
};

export default getResultView;
