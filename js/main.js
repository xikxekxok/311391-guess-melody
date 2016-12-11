import getWelcomeView from './screenModules/welcome';
import setScreen from './infrastructure/currentScreenProvider';
import getResultView from './screenModules/result';
import getQuestions from './questions/questionProvider';
import calcGameResult from './resultService';
import openGame from './game';
import {checkIsProvided} from './infrastructure/throwHelper';

const openWelcome = () => {
  let welcomeElement = getWelcomeView(startGame);
  setScreen(welcomeElement);
};

const startGame = () => {
  let questions = getQuestions();

  openGame(questions, showResults);
};

const showResults = (answers) => {
  checkIsProvided(answers, 'answers');

  let resultModel = calcGameResult(answers);

  let resultElement = getResultView(resultModel, startGame);
  setScreen(resultElement);
};

openWelcome();
