import getElementFromTemplate from '../infrastructure/elementProvider';
import {registerClickHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';

// TODO если не будет дальше по заданиям - добавить числительные у процентов + переводить секунды в минуты и секунды
const getResultScreen = (model) => getElementFromTemplate(
    `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${model.resultText}</h2>
    <div class="main-stat">За&nbsp;${model.minuteCount}&nbsp;секунды<br>вы&nbsp;отгадали ${model.guessCount}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${model.betterPercent}%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`
);

const getResultView = (resultModel, callBack) => {
  checkIsProvided(resultModel, 'resultModel');
  checkIsProvided(callBack, 'callBack');

  let element = getResultScreen(resultModel);

  registerClickHandler(element, '.main-replay', callBack);

  return element;
};

export default getResultView;
