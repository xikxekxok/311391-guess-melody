import getElementFromTemplate from '../elementProvider';
import setScreen from '../currentScreenProvider';
import openResultScreen from './result';
import {registerClickHandler, registerSubmitHandler} from '../domHelper';


const getAnswer = (answerModel) =>
    `<div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-${answerModel.id}" id="a-${answerModel.id}">
        <label class="genre-answer-check" for="a-${answerModel.id}"></label>
      </div>`;

const getLevelGenreScreen = (model) => getElementFromTemplate(
    `<section class="main main--level main--level-genre">
    <h2 class="title">${model.question}</h2>
    <form class="genre">
      ${model.answers.map((x) => getAnswer(x)).join('')}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>`
);

let checkboxes = [];

const bindAnswers = (element, questionModel) => {
  checkboxes = getCheckboxes(questionModel);

  for (let value of checkboxes) {
    let closure = value;
    registerClickHandler(element, `#a-${value.id}`, () => {
      closure.selected = !closure.selected;
      setButtonState(checkboxes);
    });
  }

  setButtonState(checkboxes);
};

const setButtonState = (checkboxes) => {
  let button = document.querySelector('.genre-answer-send');
  let newState = checkboxes.filter((x) => x.selected).length === 0;

  button.disabled = newState;
};

const getCheckboxes = (questionModel) => {
  let result = questionModel.answers.map(x=>{{id: x.id, selected: false}});
  return result;
};


const getLevelView = (questionModel, answerCallback) => {
  let element = getLevelGenreScreen(questionModel);
  setScreen(screen);

  bindAnswers(element, questionModel);

  registerSubmitHandler(element, '.genre', ()=>{
    answerCallback(checkboxes.filter(x=>x.selected).map(x=>x.id))
  }), true);
};

export default getLevelView;
