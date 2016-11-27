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

const defaultModel = {
  question: 'Выберите инди-рок треки',
  answers: [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
  ]
};

const open = () => {
  let screen = getLevelGenreScreen(defaultModel);
  setScreen(screen);

  bindAnswers();
  bindSubmit();
};

const bindAnswers = () => {
  const checkboxes = getCheckboxes();

  for (let value of checkboxes) {
    let closure = value;
    registerClickHandler(`#${value.id}`, () => {
      closure.selected = !closure.selected;
      setButtonState(checkboxes);
    });

  }
  setButtonState(checkboxes);
};

const bindSubmit = () => {
  registerSubmitHandler('.genre', openResultScreen, true);
};

const setButtonState = (checkboxes) => {
  let button = document.querySelector('.genre-answer-send');
  let newState = checkboxes.filter((x) => x.selected).length === 0;

  button.disabled = newState;
};

const getCheckboxes = () => {
  let result = [
    {id: 'a-1', selected: false},
    {id: 'a-2', selected: false},
    {id: 'a-3', selected: false},
    {id: 'a-4', selected: false}
  ];
  return result;
};

export default open;
