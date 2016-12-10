import openWelcome from './screenModules/welcome';
import openResult from './screenModules/result';
import {getQuestions} from './questionModel';

openWelcome(startGame);

const startGame = () => {
  let questions = getQuestions();

  openGame(questions, showResults);
}

const showResults = (answers) => {
  let gameResult = calcGameResult(answers);

  openResult(gameResult, startGame);
}
