import {setScreen, updateTimer} from './infrastructure/currentScreenProvider';
import LevelArtistView from './screenModules/level_artist';
import LevelGenreView from './screenModules/level_genre';
import {questionType} from './questions/questionsModel';
import {checkIsProvided, checkNotUndefined} from './infrastructure/throwHelper';
import validateAnswer from './questions/validateAnswerService';
import GameModel from './gameModel';

let _endCallback;
let _timer;
let _model;

const openGame = (questions, endCallback) => {
  checkIsProvided(questions, 'question');
  checkIsProvided(endCallback, 'endCallback');

  _model = new GameModel(questions);

  _timer = setInterval(onElapsed, 1000);
  updateTimer(_model.getTimerViewModel());

  _endCallback = endCallback;

  showNextQuestion();
};

const onElapsed = () => {
  _model.timerElapsed();

  updateTimer(_model.getTimerViewModel());

  if (_model.isEndGame()) {
    endGame();
  }
};

const onAnswer = (answer) => {
  checkNotUndefined(answer, 'answer'); // 0 - валидное значение в данном случае

  let isCorrect = validateAnswer(_model.currentQuestion, answer);

  _model.questionAnswered(isCorrect);

  if (_model.isEndGame()) {
    endGame();
  } else {
    showNextQuestion();
  }
};

const showNextQuestion = () => {
  let nextLevelElement;

  switch (_model.currentQuestion.type) {
    case questionType.artist:
      nextLevelElement = (new LevelArtistView(_model.currentQuestion, onAnswer)).element;
      break;

    case questionType.genre:
      nextLevelElement = (new LevelGenreView(_model.currentQuestion, onAnswer)).element;
      break;

    default:
      throw Error('unknown level type'); // TODO: разобраться, как добавить модель уровня в качестве деталей ошибки
  }

  setScreen(nextLevelElement, true);
};

const endGame = () => {
  clearInterval(_timer);

  _endCallback(_model.result);
};

export default openGame;
