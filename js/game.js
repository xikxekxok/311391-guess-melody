import setScreen from './currentScreenProvider';
import levelArtist from './screenModules/level_artist';
import levelGenre from './screenModules/level_genre';
import {questionType} from './questionModel';

let _endCallback;
let _questions;
let _currentQuestion;
let _result;

const openGame = (questions, endCallback) => {
  _endCallback = endCallback;
  _questions = questions;
  _result = [];

  showNextQuestion();
}

const onAnswer = (answer) => {
  _result.push({
    question: _currentQuestion,
    answer: answer
  });

  if (_questions.hasUnanswered())
    showNextQuestion();
  else
    endGame();
}

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
      throw new Error('unknown level type'); //TODO: разобраться, как добавить модель уровня в качестве деталей ошибки
  }

  let _currentQuestion = nextQuestion;
  setScreen(nextLevelElement);
}

const endGame = () => {
  _endCallback(_result);
}
