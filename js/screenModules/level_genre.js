import getElementFromTemplate from '../infrastructure/elementProvider';
import {registerClickHandler, registerSubmitHandler} from '../infrastructure/domHelper';
import {checkIsProvided} from '../infrastructure/throwHelper';

const getAnswer = (answerModel) =>
    `<div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-${answerModel.id}" id="a-${answerModel.id}">
        <label class="genre-answer-check" for="a-${answerModel.id}"></label>
      </div>`;

const getLevelGenreScreen = (model) => getElementFromTemplate(
    `<section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>
    <div class="main-wrap">
    <h2 class="title">${model.question}</h2>
    <form class="genre">
      ${model.answers.map((x) => getAnswer(x)).join('')}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
    </div>
  </section>`
);

let checkboxes = [];
let element;

const bindAnswers = () => {

  for (let value of checkboxes) {
    let closure = value;
    registerClickHandler(element, `#a-${value.id}`, () => {
      closure.selected = !closure.selected;
      setButtonState();
    });
  }

  setButtonState();
};

const setButtonState = () => {
  let button = element.querySelector('.genre-answer-send');
  let newState = checkboxes.filter((x) => x.selected).length === 0;

  button.disabled = newState;
};

const getCheckboxes = (questionModel) => {
  let result = questionModel.answers.map((x) => {
    return {id: x.id, selected: false};
  });
  return result;
};


const getLevelView = (questionModel, answerCallback) => {
  checkIsProvided(questionModel, 'questionModel');
  checkIsProvided(answerCallback, 'answerCallback');

  element = getLevelGenreScreen(questionModel);
  checkboxes = getCheckboxes(questionModel);

  bindAnswers();

  registerSubmitHandler(element, '.genre', () => {
    answerCallback(checkboxes.filter((x) => x.selected).map((x) => x.id));
  }, true);

  return element;
};

export default getLevelView;
