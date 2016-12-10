import getWelcomeView from './screenModules/welcome';
import setScreen from './infrastructure/currentScreenProvider';
import openResult from './screenModules/result';
import getQuestions from './questions/questionProvider';

const startGame = () => {
  let questions = getQuestions();

  openGame(questions, showResults);
}

const showResults = (answers) => {
  let gameResult = calcGameResult(answers);

  openResult(gameResult, startGame);
}

let welcomeElement = getWelcomeView(startGame);
setScreen(welcomeElement);
