import {setScreen, updateTimer} from './infrastructure/currentScreenProvider';
import levelArtist from './screenModules/level_artist';
import levelGenre from './screenModules/level_genre';
import {questionType} from './questions/questionsModel';
import {checkIsProvided, checkNotUndefined} from './infrastructure/throwHelper';
import {getInitState, timerElapsed, questionAnswered, timeSpended} from './lifeService';
import validateAnswer from './questions/validateAnswerService';
import {GameResultModel} from './result/gameResultModel';

let _lifeState;
let _endCallback;
let _questions;
let _currentQuestion;
let _timer;

const openGame = (questions, endCallback) => {
  checkIsProvided(questions, 'question');
  checkIsProvided(endCallback, 'endCallback');

  _lifeState = getInitState();
  _questions = questions;
  _endCallback = endCallback;

  _timer = setInterval(onElapsed, 1000);

  showNextQuestion();
};

const onElapsed = () => {
  _lifeState = timerElapsed(_lifeState);

  updateTimer(getTimerViewModel());

  if (_lifeState.isDead) {
    endGame();
  }
};

const onAnswer = (answer) => {
  checkNotUndefined(answer, 'answer'); // 0 - валидное значение в данном случае

  let isCorrect = validateAnswer(_currentQuestion, answer);

  _questions.questionAnswered(isCorrect);

  _lifeState = questionAnswered(_lifeState, isCorrect);

  if (_lifeState.isDead || !_questions.hasUnanswered()) {
    endGame();
  } else {
    showNextQuestion();
  }
};

const getTimerViewModel = () => {
  return {
    mins: Math.floor(_lifeState.time / 60),
    secs: _lifeState.time % 60
  };
};

const showNextQuestion = () => {
  let nextQuestion = _questions.getNext();

  let nextLevelElement;

  switch (nextQuestion.type) {
    case questionType.artist:
      nextLevelElement = levelArtist(getTimerViewModel(), nextQuestion, onAnswer);
      break;

    case questionType.genre:
      nextLevelElement = levelGenre(getTimerViewModel(), nextQuestion, onAnswer);
      break;

    default:
      throw Error('unknown level type'); // TODO: разобраться, как добавить модель уровня в качестве деталей ошибки
  }

  _currentQuestion = nextQuestion;

  setScreen(nextLevelElement);
};

const endGame = () => {
  clearInterval(_timer);

  _endCallback(new GameResultModel(_questions.getResult(), timeSpended(_lifeState)));
};

export default openGame;
