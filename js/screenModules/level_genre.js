import getElementFromTemplate from '../elementProvider';
import setScreen from '../currentScreenProvider';
import openResultScreen from './result';
import {onClick, onSubmit} from '../domHelper';

const levelGenreScreen = getElementFromTemplate(
    `<section class="main main--level main--level-genre">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>`
);

const open = () => {
  setScreen(levelGenreScreen);
  bindAnswers();
  bindSubmit();
};

const bindAnswers = () => {
  const checkboxes = getCheckboxes();

  for (let value of checkboxes) {
    let closure = value;
    onClick(`#${value.id}`, () => {
      closure.selected = !closure.selected;
      setButtonState(checkboxes);
    });

  }
  setButtonState(checkboxes);
};

const bindSubmit = () => {
  onSubmit('.genre', openResultScreen, true);
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
