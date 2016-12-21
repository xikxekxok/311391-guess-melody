import setScreen from './infrastructure/currentScreenProvider';
import levelArtist from './screenModules/level_artist';
import levelGenre from './screenModules/level_genre';
import {questionType} from './questions/questionsModel';
import {checkIsProvided, checkNotUndefined} from './infrastructure/throwHelper';
import {getInitState, timerElapsed, questionAnswered, timeSpended} from './gameStateService';
import validateAnswer from './validateAnswerService';

let _currState;
let _endCallback;
let _questions;
let _currentQuestion;
let _result;
let _timer;

const openGame = (questions, endCallback) => {
  checkIsProvided(questions, 'question');
  checkIsProvided(endCallback, 'endCallback');

  _currState = getInitState();
  _questions = questions;
  _endCallback = endCallback;
  _result = [];

  _timer = setInterval(onElapsed, 1000);

  showNextQuestion();
};

const onElapsed = () => {
  _currState = timerElapsed(_currState);

  if (_currState.isDead) {
    endGame();
  }
}

const onAnswer = (answer) => {
  checkNotUndefined(answer, 'answer'); // 0 - валидное значение в данном случае

  let isCorrect = validateAnswer(_currentQuestion, answer);

  _questions.questionAnswered(isCorrect);

  _currState = questionAnswered(_currState, isCorrect);

  if (_currState.isDead || !_questions.hasUnanswered()) {
    endGame();
  }
  else {
    showNextQuestion();
  }
};

const showNextQuestion = () => {
  let nextQuestion = _questions.getNext();

  let nextLevelElement;

  switch (nextQuestion.type) {
    case questionType.artist:
      nextLevelElement = levelArtist(nextQuestion, onAnswer);
      break;

    case questionType.genre:
      nextLevelElement = levelGenre(nextQuestion, onAnswer);
      break;

    default:
      throw Error('unknown level type'); // TODO: разобраться, как добавить модель уровня в качестве деталей ошибки
  }

  _currentQuestion = nextQuestion;

  setScreen(nextLevelElement);
};

const endGame = () => {
  clearInterval(_timer);
  
  _endCallback({
    answers: _questions.getResult(),
    time: timeSpended(_currState)
  });
};

export default openGame;
